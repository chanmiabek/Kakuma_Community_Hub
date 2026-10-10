import OpenAI from "openai";

const configuredApiKey = process.env.OPENAI_API_KEY?.trim();
const configuredBaseURL = process.env.OPENAI_BASE_URL?.trim() || undefined;

// Keep this module importable when the optional AI integration is not set up.
// The API route reports the missing configuration to the caller.
export const aiClient = new OpenAI({
  apiKey: configuredApiKey || "not-configured",
  baseURL: configuredBaseURL,
});

export const isAiConfigured = Boolean(configuredApiKey);

export const CHAT_MODEL = process.env.AI_CHAT_MODEL ?? "gpt-4o-mini";
export const EMBEDDING_MODEL = process.env.AI_EMBEDDING_MODEL ?? "text-embedding-3-small";
