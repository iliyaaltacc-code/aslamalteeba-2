export const config = {
  runtime: "nodejs",
};// /api/chat.js — Real AI with memory (Vercel)

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory store (per deployment instance)
let conversations = {};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, sessionId = "default" } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Initialize memory
    if (!conversations[sessionId]) {
      conversations[sessionId] = [
        {
          role: "system",
          content:
            "You are Aslama AI, a professional, concise, helpful assistant for a premium tire company in the UAE. Be confident, clear, and friendly. Avoid emojis.",
        },
      ];
    }

    // Add user message
    conversations[sessionId].push({
      role: "user",
      content: message,
    });

    // Call OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversations[sessionId],
      temperature: 0.4,
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content;

    // Store assistant reply
    conversations[sessionId].push({
      role: "assistant",
      content: reply,
    });

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("AI error:", err);
    return res.status(500).json({
      error: "AI failed",
      details: err.message,
    });
  }
}
