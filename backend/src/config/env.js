import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 8787),
  llmProvider: process.env.LLM_PROVIDER || "groq",
  // Groq API
  groqApiKey: process.env.GROQ_API_KEY || "",
  groqModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  // Ollama (legacy/fallback)
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.1",
};
