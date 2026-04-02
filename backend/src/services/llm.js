import { env } from "../config/env.js";
import { chatWithOllama } from "./ollama.js";

export async function chat(text) {
  const provider = String(env.llmProvider || "ollama").toLowerCase();

  if (provider === "ollama") {
    return chatWithOllama(text);
  }

  return {
    reply: `Unsupported LLM_PROVIDER="${provider}". Use LLM_PROVIDER=ollama in backend/.env.`,
    provider: "unsupported",
  };
}
