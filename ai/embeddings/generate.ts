import { aiClient, EMBEDDING_MODEL } from "@/ai/client";

export async function generateEmbedding(text: string): Promise<number[]> {
  const res = await aiClient.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const res = await aiClient.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts.map((t) => t.slice(0, 8000)),
  });
  return res.data.map((d) => d.embedding);
}