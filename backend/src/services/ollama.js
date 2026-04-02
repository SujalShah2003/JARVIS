import { env } from "../config/env.js";

export async function chatWithOllama(text) {
  const baseUrl = env.ollamaBaseUrl.replace(/\/$/, "");
  const url = `${baseUrl}/api/chat`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  let response;
  try {
    response = await fetch(url, {
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
      signal: controller.signal,
    });
  } catch (err) {
    console.error("Failed to connect to Ollama backend", err);
    const isAbort = err.name === "AbortError";
    throw new Error(
      isAbort
        ? `Ollama request timed out after 30s`
        : `Failed to connect to Ollama at ${url}: ${err?.message || err}`
    );
  } finally {
    clearTimeout(timeout);
  }

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
