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
const GEMINI_BASE          = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL_DEFAULT = "gemini-3.1-pro-preview";
// Models the front end is allowed to request. Anything not listed falls back to the default.
const GEMINI_ALLOWED_MODELS = new Set([
  "gemini-3.1-pro-preview",
  "gemini-3.5-flash",
  "gemini-2.5-flash",
]);

// Gemini 3.x uses discrete thinking LEVELS (low | medium | high), NOT the
// legacy numeric thinking_budget — and the two cannot be combined in one
// request (400 error). 3.1 Pro does not support "minimal". Default kept at
// "low" to preserve the original latency intent (reach the first prose token
// fast); the front-end can override per-call via body.thinking_level, and it
// can be raised to "medium" for richer stories at some latency/cost.
const GEMINI_THINKING_LEVELS  = new Set(["low", "medium", "high"]);
const GEMINI_THINKING_DEFAULT = "low";
// Output headroom above the prose budget so a thinking overflow can never
// silently truncate the story JSON (thinking is billed against the output cap).
// Scales with the thinking level, bounded by the model's 64k output ceiling.
const GEMINI_OUTPUT_CEILING   = 65536;
const GEMINI_THINKING_HEADROOM: Record<string, number> = {
  low: 8192, medium: 16384, high: 32768,
};

// Transient-error retry policy for Gemini calls. The 2.5 Pro endpoint can
// return 503 "service unavailable" under load even when the user did nothing
// wrong; without this, every flake bubbles straight to the page. Exponential
// backoff (~0.8s, 1.6s, 3.2s + jitter) gives a worst case ~6s of added wait
// — comfortably inside the 30s function budget even when the real generation
// also runs. Only the listed statuses retry; 400/401/403 etc. fail fast.
// ── Anthropic effort + token headroom ────────────────────────────────────
// `effort` replaced `thinking: {type:"enabled", budget_tokens}` in the Opus/
// Sonnet 5 generation. Only low and high are exposed; xhigh and max target
// long-horizon agentic work and buy latency, not prose quality, here.
//
// Critically, Anthropic's max_tokens is ONE budget spanning thinking AND
// output, unlike Gemini where thinking headroom is added separately. These
// values are added on top of the requested prose budget for that reason.
const ANTHROPIC_EFFORT_LEVELS  = new Set(["low", "high"]);
const ANTHROPIC_EFFORT_DEFAULT = "low";
const ANTHROPIC_THINKING_HEADROOM: Record<string, number> = {
  low:   8_192,
  high: 32_768,
};
const ANTHROPIC_OUTPUT_CEILING = 128_000; // Opus 5 / Sonnet 5 max_tokens

const GEMINI_RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const GEMINI_RETRY_MAX_ATTEMPTS = 3;
const GEMINI_RETRY_BASE_MS = 800;

// ── Keepalive policy (streaming path only) ───────────────────────────────
// Netlify's gateway enforces a ~30s deadline on TIME TO FIRST BYTE, not on
// total request duration. Measured 2026-08-29: a call that sent nothing for
// 30.4s was killed with a 504 + HTML error page, while a call whose first
// byte landed at ~28s was allowed to run the full 37s to completion.
//
// Gemini emits no output tokens during its thinking phase, so a heavy episode
// can sit silent well past 30s and die with the generation perfectly healthy.
// (This is what `thinking_level: 'low'` was really buying — a faster first
// byte, not a faster generation.) We therefore commit the response early and
// emit a keepalive until real content arrives.
//
// The keepalive is a `thinking_delta` event rather than an SSE comment: the
// front-end already handles that shape by parking the progress bar at
// "Pensando en la historia…", so the bytes double as honest UI feedback.
const GEMINI_PING_MS = 10_000;      // idle-gap guard; also covers headers→first-chunk
// Must exceed the worst-case retry chain below (~0.8+1.6+3.2s ≈ 5.6s plus request
// overhead), or an upstream failure that exhausts its retries lands AFTER the
// response is already committed as 200 — where it can no longer travel as an HTTP
// status. Errors resolve in seconds; successes take ~25-30s (Gemini's thinking
// phase), so a wide window separates them cleanly. Nothing is sent during this
// wait, so it is bounded by the gateway's ~30s first-byte deadline: 20s keeps a
// 10s margin to commit and land the first keepalive. Costs nothing on success —
// it is a race, so a fast answer wins immediately and the timer never matters.
const GEMINI_FAST_PATH_MS = 20_000;
const GEMINI_HARD_ABORT_MS = 120_000; // keepalive removes the 30s ceiling, so impose our own

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
  // Anthropic's `max_tokens` is a SINGLE budget covering thinking AND output.
  // Opus 5 / Sonnet 5 run adaptive thinking by default, so a bare 8000 gets
  // largely consumed reasoning and the JSON is cut off mid-object — surfacing
  // as "Unexpected end of JSON input" rather than as any API error. Gemini
  // never showed this because that path adds headroom on top of prose tokens;
  // this one passed max_tokens straight through. Mirror the Gemini approach.
  const reqEffort = String(body.effort ?? ANTHROPIC_EFFORT_DEFAULT).toLowerCase();
  const effort = ANTHROPIC_EFFORT_LEVELS.has(reqEffort) ? reqEffort : ANTHROPIC_EFFORT_DEFAULT;
  const proseTokens = Number(body.max_tokens) || 4000;
  const maxTokens = Math.min(
    proseTokens + (ANTHROPIC_THINKING_HEADROOM[effort] ?? 8192),
    ANTHROPIC_OUTPUT_CEILING,
  );

  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model:      body.model      || "claude-sonnet-5",
      max_tokens: maxTokens,
      stream:     stream,
      system:     body.system     || "",
      messages:   body.messages   || [],
      effort,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const errorMessage =
      data?.error?.message ||
      (typeof data?.error === "string" ? data.error : "Unknown API error");
    console.error("Anthropic error:", response.status, body.model, effort, errorMessage);
    return json({ error: errorMessage }, response.status);
  }

  if (stream) {
    // Transparent tee: every upstream byte is forwarded verbatim so the client's
    // parser is unaffected, while we sniff `message_delta` for an abnormal
    // stop_reason and append a named error event. Without this a truncated or
    // refused response reaches the page as silence and gets misreported as bad
    // JSON — the same blindness the Gemini finishReason fix removed.
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let sniff = "";
    let stopReason: string | null = null;
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

    const teed = new ReadableStream({
      async start(controller) {
        try {
          reader = response.body!.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);                       // forward untouched
            sniff += decoder.decode(value, { stream: true });
            const lines = sniff.split("\n");
            sniff = lines.pop() ?? "";
            for (const line of lines) {
              const t = line.trim();
              if (!t.startsWith("data:")) continue;
              try {
                const obj = JSON.parse(t.slice(5).trim());
                const sr = obj?.delta?.stop_reason ?? obj?.message?.stop_reason;
                if (typeof sr === "string" && sr) stopReason = sr;
              } catch { /* partial line */ }
            }
          }
          if (stopReason === "max_tokens" || stopReason === "refusal") {
            const msg = stopReason === "max_tokens"
              ? "El modelo alcanzó el límite de tokens antes de terminar el JSON."
              : "El modelo rechazó la solicitud por motivos de seguridad.";
            console.error("Anthropic abnormal stop:", { model: body.model, effort, stopReason, maxTokens });
            const evt = { type: "error", error: { message: msg + " Intenta de nuevo." } };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
      cancel() { reader?.cancel().catch(() => {}); },
    });

    return new Response(teed, { status: 200, headers: sseHeaders() });
  }

  const data = await response.json();
  return json(data, 200);
}

// ─────────────────────────────────────────────────────────────────────────
//  GEMINI PATH — translate request in, translate response out
// ─────────────────────────────────────────────────────────────────────────
async function handleGemini(body: any, apiKey: string, stream: boolean): Promise<Response> {
  // ── Model selection: accept from client, validate against allowlist ──
  const requestedModel = String(body.gemini_model || "");
  const model = GEMINI_ALLOWED_MODELS.has(requestedModel) ? requestedModel : GEMINI_MODEL_DEFAULT;

  // ── Thinking config: 2.5 models use numeric thinkingBudget, 3.x uses string thinkingLevel ──
  const is25Family = model.startsWith("gemini-2.5") || model.startsWith("gemini-2.0");

  let thinkingConfigObj: any;
  let headroom: number;

  if (is25Family) {
    // Gemini 2.5 thinking: numeric budget (tokens). 1024 ≈ "low" equivalent.
    const budget = 1024;
    thinkingConfigObj = { thinkingBudget: budget };
    headroom = budget * 4;  // 4096 — generous since budget caps thinking output
  } else {
    const reqLevel      = String(body.thinking_level ?? GEMINI_THINKING_DEFAULT).toLowerCase();
    const thinkingLevel = GEMINI_THINKING_LEVELS.has(reqLevel) ? reqLevel : GEMINI_THINKING_DEFAULT;
    thinkingConfigObj = { thinkingLevel };
    headroom = GEMINI_THINKING_HEADROOM[thinkingLevel] ?? 8192;
  }

  // Treat body.max_tokens as the PROSE budget (provider-agnostic meaning).
  // Gemini charges thinking against the output cap, so pad above the prose
  // budget by a level-appropriate headroom, bounded by the 64k output ceiling.
  const proseTokens     = Number(body.max_tokens) || 4000;
  const maxOutputTokens = Math.min(proseTokens + headroom, GEMINI_OUTPUT_CEILING);

  const geminiReq: any = {
    contents: (Array.isArray(body.messages) ? body.messages : []).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }],
    })),
    generationConfig: {
      maxOutputTokens,
      // Gemini 3 strongly recommends leaving temperature at its 1.0 default;
      // values below 1.0 can cause looping or degraded reasoning. Only forward
      // an explicit temperature when the caller actually sends one.
      ...(typeof body.temperature === "number" ? { temperature: body.temperature } : {}),
      thinkingConfig: thinkingConfigObj,
      // Force structured JSON output. With this on, Gemini guarantees the
      // emitted text concatenates to valid JSON — kills the "unterminated
      // string" class of errors the front-end repair pipeline can't always
      // recover from when a quotation mark slips through unescaped.
      responseMimeType: "application/json",
      // Strict structured output: the front end sends response_schema on the
      // story+quiz call. Constrained decoding forces schema-conforming JSON,
      // retiring the malformed-JSON class (unescaped quotes, trailing content)
      // on the Gemini path.
      ...(body.response_schema ? { responseSchema: body.response_schema } : {}),
    },
  };
  // Anthropic's top-level `system` maps to Gemini's systemInstruction.
  if (body.system) {
    geminiReq.systemInstruction = { parts: [{ text: String(body.system) }] };
  }

  const endpoint = stream
    ? `${GEMINI_BASE}/${model}:streamGenerateContent?alt=sse`
    : `${GEMINI_BASE}/${model}:generateContent`;

  // Hard ceiling of our own. The keepalive below defeats the gateway's 30s
  // first-byte deadline, which also means a genuinely wedged upstream would
  // otherwise hang the page forever.
  const ac = new AbortController();
  const hardAbort = setTimeout(() => ac.abort(), GEMINI_HARD_ABORT_MS);

  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(geminiReq),
    signal: ac.signal,
  };

  // ── Non-streaming (prep call): normalize to Anthropic content-block shape ──
  // Front-end parser expects data.content = [{ type:'text', text:'...' }].
  // Prep calls are small and fast, so they keep the plain blocking shape.
  if (!stream) {
    try {
      const upstream = await fetchGeminiWithRetry(endpoint, init);
      if (!upstream.ok) {
        const data = await upstream.json().catch(() => ({}));
        const errorMessage =
          data?.error?.message ||
          (typeof data?.error === "string" ? data.error : "Unknown Gemini API error");
        return json({ error: errorMessage }, upstream.status);
      }
      const data  = await upstream.json();
      const parts = data?.candidates?.[0]?.content?.parts ?? [];
      const text  = parts
        .filter((p: any) => p && !p.thought && typeof p.text === "string")
        .map((p: any) => p.text)
        .join("");
      // Same abnormal-stop guard as the streaming path: a 200 with no usable
      // text should name its reason instead of returning an empty content block
      // for the page to misdiagnose later.
      if (!text) {
        const fr = data?.candidates?.[0]?.finishReason;
        const br = data?.promptFeedback?.blockReason;
        console.error("Gemini empty non-streaming response:", { finishReason: fr, blockReason: br });
        return json(
          { error: br ? `El proveedor bloqueó la solicitud (${br}).`
                      : fr ? `El modelo terminó de forma anómala (${fr}).`
                           : "El proveedor no devolvió texto alguno." },
          502,
        );
      }
      return json({ content: [{ type: "text", text }] }, 200);
    } finally {
      clearTimeout(hardAbort);
    }
  }

  // Single guarded promise, awaited in two places without risking an
  // unhandled rejection if the race below settles on the timer instead.
  type Guarded =
    | { ok: true;  res: Response }
    | { ok: false; err: unknown };

  const guarded: Promise<Guarded> = fetchGeminiWithRetry(endpoint, init).then(
    (r) => ({ ok: true as const, res: r }),
    (e) => ({ ok: false as const, err: e }),
  );

  // Fast path: give the upstream a brief moment to produce a real HTTP status.
  // Config and auth failures (400/401/403) come back in well under a second,
  // so the common error cases keep today's exact status-code semantics — the
  // front-end's `!res.ok` handling and its 502/503/504 retry stay intact.
  // Only genuinely slow calls fall through to the committed-stream path, where
  // a late failure has to be reported inside the stream instead.
  const TIMER = Symbol("fastpath");
  const settled = await Promise.race([
    guarded,
    new Promise<typeof TIMER>((r) => setTimeout(() => r(TIMER), GEMINI_FAST_PATH_MS)),
  ]);

  if (settled !== TIMER) {
    if (!settled.ok) {
      clearTimeout(hardAbort);
      return json({ error: "Failed to reach the generation provider. Please try again." }, 502);
    }
    if (!settled.res.ok) {
      const data = await settled.res.json().catch(() => ({}));
      const errorMessage =
        data?.error?.message ||
        (typeof data?.error === "string" ? data.error : "Unknown Gemini API error");
      clearTimeout(hardAbort);
      return json({ error: errorMessage }, settled.res.status);
    }
  }

  // ── Streaming (prose call): translate Gemini SSE → Anthropic SSE ──
  // The front-end stream reader only reacts to events of the exact shape
  //   { type:'content_block_delta', delta:{ type:'text_delta', text:'...' } }
  // and ignores everything else (it skips any line not starting with
  // `data: `), so we emit only those plus the thinking_delta keepalive.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buf = "";
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let lastFinishReason: string | null = null;
  let lastBlockReason: string | null = null;
  let sawText = false;

  const translated = new ReadableStream({
    async start(controller) {
      // First byte goes out NOW, before we know anything about the upstream.
      // This is the whole point: it commits the response and starts the
      // gateway's clock over, buying Gemini unlimited thinking time.
      const ping = () => {
        try {
          const evt = { type: "content_block_delta", delta: { type: "thinking_delta" } };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
        } catch { /* stream already closed or cancelled */ }
      };
      ping();
      const heartbeat = setInterval(ping, GEMINI_PING_MS);

      try {
        const outcome = await guarded;
        if (!outcome.ok) throw outcome.err;

        const upstream = outcome.res;
        if (!upstream.ok) {
          // Late failure — the response is already committed as 200, so this
          // cannot travel as an HTTP status. Emit an error EVENT: closing
          // silently would leave the client with an empty string, which it
          // reports as the misleading "JSON inválido del modelo".
          const data = await upstream.json().catch(() => ({}));
          const msg =
            data?.error?.message ||
            (typeof data?.error === "string" ? data.error : "Unknown Gemini API error");
          console.error("Gemini late failure after stream commit:", upstream.status, msg);
          const evt = { type: "error", error: { message: msg, status: upstream.status } };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
          controller.close();
          return;
        }

        reader = upstream.body!.getReader();
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

              // Gemini can stop early and still return 200: a safety filter, a
              // recitation block, or hitting the output cap. The reason arrives
              // in these fields, and discarding them is what turns an explained
              // stop into the misleading "JSON inválido del modelo" downstream.
              const fr = obj?.candidates?.[0]?.finishReason;
              if (typeof fr === "string" && fr && fr !== "STOP") lastFinishReason = fr;
              const br = obj?.promptFeedback?.blockReason;
              if (typeof br === "string" && br) lastBlockReason = br;

              const parts = obj?.candidates?.[0]?.content?.parts ?? [];
              for (const part of parts) {
                if (part?.thought) continue;            // skip any thought summary parts
                const text = part?.text;
                if (typeof text === "string" && text.length) {
                  sawText = true;
                  const evt = { type: "content_block_delta", delta: { type: "text_delta", text } };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
                }
              }
            } catch {
              /* partial/garbled line — buffering on the next read recovers it */
            }
          }
        }

        // An abnormal stop means the JSON we forwarded is incomplete (or absent).
        // Say so explicitly rather than letting the page parse a fragment and
        // blame the model's syntax.
        if (lastBlockReason || lastFinishReason || !sawText) {
          const reason = lastBlockReason
            ? `El proveedor bloqueó la solicitud (${lastBlockReason}).`
            : lastFinishReason === "MAX_TOKENS"
              ? "El modelo alcanzó el límite de tokens antes de terminar el JSON."
              : lastFinishReason === "SAFETY" || lastFinishReason === "PROHIBITED_CONTENT"
                ? `El modelo detuvo la generación por filtros de contenido (${lastFinishReason}).`
                : lastFinishReason === "RECITATION"
                  ? "El modelo detuvo la generación por recitación (RECITATION)."
                  : lastFinishReason
                    ? `El modelo terminó de forma anómala (${lastFinishReason}).`
                    : "El proveedor no devolvió texto alguno.";
          console.error("Gemini abnormal stop:", { lastFinishReason, lastBlockReason, sawText });
          const evt = { type: "error", error: { message: reason + " Intenta de nuevo." } };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      } finally {
        clearInterval(heartbeat);
        clearTimeout(hardAbort);
      }
    },
    cancel() {
      clearTimeout(hardAbort);
      reader?.cancel().catch(() => {});
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
