import { env } from "../config/env.js";
import { chatWithGroq } from "./groq.js";
import { chatWithOllama } from "./ollama.js";

export async function chat(text) {
  const provider = String(env.llmProvider || "groq").toLowerCase();

  if (provider === "groq") {
    return chatWithGroq(text);
  }

  if (provider === "ollama") {
    return chatWithOllama(text);
  }

  return {
    reply: `Unsupported LLM_PROVIDER="${provider}". Use LLM_PROVIDER=groq or LLM_PROVIDER=ollama in backend/.env.`,
    provider: "unsupported",
  };
}
