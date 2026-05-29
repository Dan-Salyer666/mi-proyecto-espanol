import type { Context, Config } from "@netlify/functions";

// ═══════════════════════════════════════════════════════════════════════
//  MULTI-PROVIDER GENERATION ROUTER  →  /api/generate
//
//  Single endpoint for Comprensión Lectora story generation. The front-end
//  builds a provider-agnostic request (the SAME { system, messages, model,
//  max_tokens, stream } shape it already sends to /api/claude) and adds one
//  field: `provider`. This function dispatches:
//
//    provider === "gemini"  → Google Gemini, with request + response shapes
//                             TRANSLATED so the front-end never sees the
//                             difference (response normalized to Anthropic's
//                             content-block shape; streaming SSE re-emitted as
//                             Anthropic content_block_delta events).
//    anything else (default)→ Anthropic, behaving identically to claude.mts.
//
//  claude.mts is left untouched and continues to serve every other page
//  (traducción-interactiva, the bible continuity call, etc.). Only the two
//  Comprensión Lectora calls that need routing point here.
//
//  Auth, password gate, and streaming semantics mirror claude.mts exactly so
//  the Claude path through this endpoint is byte-for-byte equivalent.
// ═══════════════════════════════════════════════════════════════════════

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const GEMINI_BASE   = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL  = "gemini-2.5-pro";

// Gemini 2.5 Pro: thinking CANNOT be disabled (floor 128, ceiling 32768) and
// thinking tokens are charged against maxOutputTokens. Default kept modest to
// limit the latency gap before the first prose token streams; the front-end
// can override per-call via body.thinking_budget once we tune in Phase 3.
const GEMINI_THINKING_MIN     = 128;
const GEMINI_THINKING_MAX     = 32768;
const GEMINI_THINKING_DEFAULT = 512;
// Extra output headroom on top of (requested prose tokens + thinking budget)
// so a thinking overflow can never silently truncate the story JSON.
const GEMINI_OUTPUT_PAD = 4096;

// Transient-error retry policy for Gemini calls. The 2.5 Pro endpoint can
// return 503 "service unavailable" under load even when the user did nothing
// wrong; without this, every flake bubbles straight to the page. Exponential
// backoff (~0.8s, 1.6s, 3.2s + jitter) gives a worst case ~6s of added wait
// — comfortably inside the 30s function budget even when the real generation
// also runs. Only the listed statuses retry; 400/401/403 etc. fail fast.
const GEMINI_RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const GEMINI_RETRY_MAX_ATTEMPTS = 3;
const GEMINI_RETRY_BASE_MS = 800;

async function fetchGeminiWithRetry(url: string, init: RequestInit): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, init);
    if (res.ok || !GEMINI_RETRY_STATUSES.has(res.status) || attempt >= GEMINI_RETRY_MAX_ATTEMPTS) {
      return res;
    }
    // Drain the failed response so the underlying connection can be reused.
    try { await res.text(); } catch { /* ignore */ }
    const delay = GEMINI_RETRY_BASE_MS * (1 << attempt) + Math.floor(Math.random() * 500);
    await new Promise(r => setTimeout(r, delay));
  }
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const quizPassword = Netlify.env.get("QUIZ_PASSWORD");
  const anthropicKey = Netlify.env.get("ANTHROPIC_API_KEY");
  const geminiKey    = Netlify.env.get("GEMINI_API_KEY");

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Password gate — identical to claude.mts. Runs before provider routing so
  // the 401 contract the front-end already handles is unchanged.
  if (quizPassword && body.password !== quizPassword) {
    return json({ error: "Invalid password." }, 401);
  }

  const provider = String(body.provider || "claude").toLowerCase();
  const stream   = body.stream === true;

  try {
    if (provider === "gemini") {
      if (!geminiKey) {
        return json({ error: "GEMINI_API_KEY is not configured on the server." }, 500);
      }
      return await handleGemini(body, geminiKey, stream);
    } else {
      if (!anthropicKey) {
        return json({ error: "ANTHROPIC_API_KEY is not configured on the server." }, 500);
      }
      return await handleAnthropic(body, anthropicKey, stream);
    }
  } catch (error) {
    return json({ error: "Failed to reach the generation provider. Please try again." }, 500);
  }
};

// ─────────────────────────────────────────────────────────────────────────
//  ANTHROPIC PATH — verbatim behavior of claude.mts
// ─────────────────────────────────────────────────────────────────────────
async function handleAnthropic(body: any, apiKey: string, stream: boolean): Promise<Response> {
  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model:      body.model      || "claude-sonnet-4-20250514",
      max_tokens: body.max_tokens || 4000,
      stream:     stream,
      system:     body.system     || "",
      messages:   body.messages   || [],
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const errorMessage =
      data?.error?.message ||
      (typeof data?.error === "string" ? data.error : "Unknown API error");
    return json({ error: errorMessage }, response.status);
  }

  if (stream) {
    return new Response(response.body, {
      status: 200,
      headers: sseHeaders(),
    });
  }

  const data = await response.json();
  return json(data, 200);
}

// ─────────────────────────────────────────────────────────────────────────
//  GEMINI PATH — translate request in, translate response out
// ─────────────────────────────────────────────────────────────────────────
async function handleGemini(body: any, apiKey: string, stream: boolean): Promise<Response> {
  const thinkingBudget = clamp(
    Number(body.thinking_budget ?? GEMINI_THINKING_DEFAULT),
    GEMINI_THINKING_MIN,
    GEMINI_THINKING_MAX
  );

  // Treat body.max_tokens as the PROSE budget (provider-agnostic meaning).
  // Gemini charges thinking against the output cap, so add it back plus a pad.
  const proseTokens     = Number(body.max_tokens) || 4000;
  const maxOutputTokens = proseTokens + thinkingBudget + GEMINI_OUTPUT_PAD;

  const geminiReq: any = {
    contents: (Array.isArray(body.messages) ? body.messages : []).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }],
    })),
    generationConfig: {
      maxOutputTokens,
      temperature: typeof body.temperature === "number" ? body.temperature : 1.0,
      thinkingConfig: { thinkingBudget },
      // Force structured JSON output. With this on, Gemini guarantees the
      // emitted text concatenates to valid JSON — kills the "unterminated
      // string" class of errors the front-end repair pipeline can't always
      // recover from when a quotation mark slips through unescaped.
      responseMimeType: "application/json",
    },
  };
  // Anthropic's top-level `system` maps to Gemini's systemInstruction.
  if (body.system) {
    geminiReq.systemInstruction = { parts: [{ text: String(body.system) }] };
  }

  const endpoint = stream
    ? `${GEMINI_BASE}/${GEMINI_MODEL}:streamGenerateContent?alt=sse`
    : `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent`;

  const upstream = await fetchGeminiWithRetry(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(geminiReq),
  });

  if (!upstream.ok) {
    const data = await upstream.json().catch(() => ({}));
    const errorMessage =
      data?.error?.message ||
      (typeof data?.error === "string" ? data.error : "Unknown Gemini API error");
    return json({ error: errorMessage }, upstream.status);
  }

  // ── Non-streaming (prep call): normalize to Anthropic content-block shape ──
  // Front-end parser expects data.content = [{ type:'text', text:'...' }].
  if (!stream) {
    const data  = await upstream.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text  = parts
      .filter((p: any) => p && !p.thought && typeof p.text === "string")
      .map((p: any) => p.text)
      .join("");
    return json({ content: [{ type: "text", text }] }, 200);
  }

  // ── Streaming (prose call): translate Gemini SSE → Anthropic SSE ──
  // The front-end stream reader only reacts to events of the exact shape
  //   { type:'content_block_delta', delta:{ type:'text_delta', text:'...' } }
  // and ignores everything else, so we emit only those.
  const reader  = upstream.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buf = "";

  const translated = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          // Gemini SSE: one `data: {GenerateContentResponse}` per event,
          // separated by blank lines. Process complete lines only; a partial
          // trailing line is held in `buf` until the next chunk completes it.
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const payload = t.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const obj   = JSON.parse(payload);
              const parts = obj?.candidates?.[0]?.content?.parts ?? [];
              for (const part of parts) {
                if (part?.thought) continue;            // skip any thought summary parts
                const text = part?.text;
                if (typeof text === "string" && text.length) {
                  const evt = { type: "content_block_delta", delta: { type: "text_delta", text } };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
                }
              }
            } catch {
              /* partial/garbled line — buffering on the next read recovers it */
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(translated, {
    status: 200,
    headers: sseHeaders(),
  });
}

// ─────────────────────────────────────────────────────────────────────────
//  helpers
// ─────────────────────────────────────────────────────────────────────────
function clamp(n: number, lo: number, hi: number): number {
  if (Number.isNaN(n)) return lo;
  return Math.min(Math.max(n, lo), hi);
}

function json(obj: any, status: number): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function sseHeaders(): Record<string, string> {
  return {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "X-Accel-Buffering": "no",
  };
}

export const config: Config = {
  path: "/api/generate",
};
