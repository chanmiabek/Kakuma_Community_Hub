export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type AiChatRequest = { messages: ChatMessage[] };
export type AiChatResponse = { reply: string; contextUsed?: number };

export type AiSearchRequest = { query: string; limit?: number };
export type AiSearchResult = {
  id: string;
  entityType: string;
  entityId: string;
  content: string;
  distance: number;
};

export type AiRecommendation = {
  id: string;
  title: string;
  score: number;
  reason?: string;
};