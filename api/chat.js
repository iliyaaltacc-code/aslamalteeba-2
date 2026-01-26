export const config = {
  runtime: "nodejs",
};

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Aslama AI, a professional assistant for a UAE tire supplier. Be concise, helpful, and business-focused. Ask clarifying questions when needed.",
        },
        ...messages,
      ],
      temperature: 0.5,
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err);
    return res.status(500).json({ error: "AI failure" });
  }
}
