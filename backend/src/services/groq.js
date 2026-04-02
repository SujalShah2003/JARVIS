import { Groq } from "groq-sdk";
import { env } from "../config/env.js";

const groq = new Groq({
  apiKey: env.groqApiKey,
});

export async function chatWithGroq(text) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are Jarvis, a concise helpful voice assistant. Reply in 1-4 short sentences unless the user asks for more detail.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: env.groqModel,
      temperature: 0.7,
      max_completion_tokens: 256,
      top_p: 1,
      stream: false,
    });

    const reply = chatCompletion?.choices?.[0]?.message?.content?.trim();

    return {
      reply: reply || "(No response text)",
      provider: "groq",
      model: env.groqModel,
    };
  } catch (err) {
    console.error("Failed to call Groq API", err);
    throw new Error(
      `Groq API error: ${err?.message || err}`
    );
  }
}
