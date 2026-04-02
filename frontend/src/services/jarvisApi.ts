export type ChatResponse = {
  reply: string;
  provider?: string;
  model?: string;
  error?: string;
};

export async function chat(text: string): Promise<ChatResponse> {
  try {
    const response = await fetch("https://jarvis-brs3.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      let details = "";
      try {
        details = await response.text();
      } catch {
        details = "";
      }
      return { reply: "", error: details || `HTTP ${response.status}` };
    }

    return response.json();
  } catch (err: any) {
    console.error("chat request failed", err);
    return {
      reply: "",
      error:
        err?.message || "Network error: could not reach backend; is server running?",
    };
  }
}
