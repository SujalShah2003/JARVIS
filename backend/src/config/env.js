import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 8787),
  llmProvider: process.env.LLM_PROVIDER || "ollama",
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.1",
};
