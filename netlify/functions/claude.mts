import type { Context, Config } from "@netlify/functions";

// ── Model allowlist ───────────────────────────────────────────────────────
// The endpoint is password-gated, but that password has leaked into a paste
// once already. Without an allowlist, anyone holding it could name any model
// on the account — including far more expensive tiers — and bill it to us.
// Verified against GET /v1/models on this account, 2026-08-31.
const ALLOWED_MODELS = new Set([
  "claude-opus-5",    // quality default: effort low→max, 128K out
  "claude-sonnet-5",  // fast option:    effort low→max, 128K out
]);
const MODEL_DEFAULT = "claude-sonnet-5";

// ── Effort ────────────────────────────────────────────────────────────────
// The Opus/Sonnet 5 generation dropped `thinking: {type:"enabled", budget_tokens}`
// (the Models API reports thinking.types.enabled.supported === false) in favour
// of `effort`. The page previously sent the old shape and this proxy silently
// dropped it — a dead parameter rather than an erroring one, which is why
// nothing ever failed and nothing ever took effect either.
//
// Only low and high are exposed. xhigh and max target long-horizon agentic
// work; for a 450-word Spanish passage they buy latency, not quality.
const ALLOWED_EFFORT = new Set(["low", "high"]);
const EFFORT_DEFAULT = "low";

const ANTHROPIC_OUTPUT_CEILING = 128_000; // Opus 5 / Sonnet 5 max_tokens

function json(payload: unknown, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const quizPassword = Netlify.env.get("QUIZ_PASSWORD");
  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");

  if (!apiKey) {
    return json({ error: "ANTHROPIC_API_KEY is not configured on the server." }, 500);
  }

  try {
    const body = await req.json();

    if (quizPassword && body.password !== quizPassword) {
      return json({ error: "Invalid password." }, 401);
    }

    const stream = body.stream === true;

    // Unknown values fall back to the default rather than erroring: a stale
    // client keeps working, just not on a model we did not sanction.
    const requestedModel = String(body.model ?? "");
    const model = ALLOWED_MODELS.has(requestedModel) ? requestedModel : MODEL_DEFAULT;

    const requestedEffort = String(body.effort ?? EFFORT_DEFAULT).toLowerCase();
    const effort = ALLOWED_EFFORT.has(requestedEffort) ? requestedEffort : EFFORT_DEFAULT;

    const maxTokens = Math.min(Number(body.max_tokens) || 4000, ANTHROPIC_OUTPUT_CEILING);

    const upstreamReq: Record<string, unknown> = {
      model,
      max_tokens: maxTokens,
      stream,
      system:   body.system   || "",
      messages: body.messages || [],
      // Nested, not top-level: the Messages API takes output_config.effort.
      // A bare `effort` is an unknown field and 400s instantly.
      output_config: { effort },
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(upstreamReq),
    });

    if (!response.ok) {
      const data: any = await response.json().catch(() => ({}));
      const errorMessage =
        data?.error?.message ||
        (typeof data?.error === "string" ? data.error : "Unknown API error");
      console.error("Anthropic error:", response.status, model, effort, errorMessage);
      return json({ error: errorMessage }, response.status);
    }

    if (stream) {
      return new Response(response.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    }

    const data: any = await response.json();

    // Abnormal stops arrive as HTTP 200 with a stop_reason, so a caller that
    // only checks res.ok sees success and then fails confusingly downstream on
    // truncated or absent text. Name the reason here instead — same class of
    // bug as Gemini's discarded finishReason.
    const stopReason = data?.stop_reason;
    const text = Array.isArray(data?.content)
      ? data.content
          .filter((b: any) => b?.type === "text" && typeof b.text === "string")
          .map((b: any) => b.text)
          .join("")
      : "";

    if (stopReason === "max_tokens" || stopReason === "refusal" || !text) {
      const reason =
        stopReason === "max_tokens"
          ? "El modelo alcanzó el límite de tokens antes de terminar la respuesta."
          : stopReason === "refusal"
            ? "El modelo rechazó la solicitud por motivos de seguridad."
            : `El proveedor no devolvió texto alguno (stop_reason: ${stopReason ?? "desconocido"}).`;
      console.error("Anthropic abnormal stop:", { model, effort, stopReason, len: text.length });
      return json({ error: reason + " Intenta de nuevo." }, 502);
    }

    return json(data, 200);

  } catch (error) {
    console.error("Anthropic proxy failure:", error);
    return json({ error: "Failed to connect to Claude API. Please try again." }, 500);
  }
};

export const config: Config = {
  path: "/api/claude",
};
