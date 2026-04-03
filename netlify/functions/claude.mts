import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const quizPassword = Netlify.env.get("QUIZ_PASSWORD");
  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();

    if (quizPassword && body.password !== quizPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = body.stream === true;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
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
      const data = await response.json();
      const errorMessage =
        data?.error?.message || (typeof data?.error === "string" ? data.error : "Unknown API error");
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
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

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to connect to Claude API. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config: Config = {
  path: "/api/claude",
};
