// api/chat.js — minimal Vercel API route (no OpenAI). Always returns { reply }.

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Vercel parses JSON automatically if Content-Type is application/json
    const body = req.body || {};
    const message =
      typeof body.message === "string" ? body.message :
      typeof body.text === "string" ? body.text :
      "";

    return res.status(200).json({
      reply: message ? `You said: ${message}` : "Send { message: 'hi' } in the request body.",
    });
  } catch (err) {
    console.error("api/chat crash:", err);
    return res.status(500).json({ error: "Server crashed", details: String(err?.message || err) });
  }
}
