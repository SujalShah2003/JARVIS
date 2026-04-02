import { Router } from "express";
import { chat } from "../services/llm.js";

export const chatRouter = Router();

chatRouter.post("/chat", async (req, res) => {
  try {
    const text = String(req.body?.text || "").trim();
    if (!text) {
      return res.status(400).json({ error: "Missing 'text'" });
    }

    const result = await chat(text);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate response" });
  }
});
