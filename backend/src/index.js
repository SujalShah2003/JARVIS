import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { chatRouter } from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api", chatRouter);

app.listen(env.port, () => {
  console.log(`Jarvis API listening on http://localhost:${env.port}`);
});
