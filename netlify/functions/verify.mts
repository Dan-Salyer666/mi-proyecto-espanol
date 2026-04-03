import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const quizPassword = Netlify.env.get("QUIZ_PASSWORD");

  // If no password is configured, let everyone through
  if (!quizPassword) {
    return new Response(
      JSON.stringify({ valid: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();

    if (body.password === quizPassword) {
      return new Response(
        JSON.stringify({ valid: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ valid: false, error: "Incorrect password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid request." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config: Config = {
  path: "/api/verify",
};
