import { env } from "../config/env.js";

export async function chatWithOllama(text) {
  const baseUrl = env.ollamaBaseUrl.replace(/\/$/, "");
  const url = `${baseUrl}/api/chat`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.ollamaModel,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You are Jarvis, a concise helpful voice assistant. Reply in 1-4 short sentences unless the user asks for more detail.",
        },
        { role: "user", content: text },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Ollama error ${response.status}: ${details}`);
  }

  const data = await response.json();
  const reply = data?.message?.content?.trim();

  return {
    reply: reply || "(No response text)",
    provider: "ollama",
    model: env.ollamaModel,
  };
}
