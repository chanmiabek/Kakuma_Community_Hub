import { semanticSearch } from "@/ai/embeddings/search";

export type RagContext = { title: string; snippet: string; href?: string };

export async function retrieveContext(query: string, k = 5): Promise<RagContext[]> {
  try {
    const hits = await semanticSearch(query, k);
    return hits.map((h) => ({
      title: h.entityType,
      snippet: h.content.slice(0, 400),
      href: h.entityType === "opportunity" ? `/opportunities/${h.entityId}` : undefined,
    }));
  } catch {
    return [];
  }
}