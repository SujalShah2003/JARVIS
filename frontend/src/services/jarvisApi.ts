export type ChatResponse = {
  reply: string;
  provider?: string;
  model?: string;
  error?: string;
};

export async function chat(text: string): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
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
}
