import OpenAI from "openai";

export const aiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export const CHAT_MODEL = process.env.AI_CHAT_MODEL ?? "gpt-4o-mini";
export const EMBEDDING_MODEL = process.env.AI_EMBEDDING_MODEL ?? "text-embedding-3-small";