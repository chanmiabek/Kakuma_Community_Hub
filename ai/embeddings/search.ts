import { prisma } from "@/lib/db";
import { generateEmbedding } from "./generate";

export type SemanticHit = {
  id: string;
  entityType: string;
  entityId: string;
  content: string;
  distance: number;
};

export async function semanticSearch(query: string, limit = 10): Promise<SemanticHit[]> {
  const vector = await generateEmbedding(query);
  const vectorLiteral = `[${vector.join(",")}]`;

  const rows = await prisma.$queryRaw<SemanticHit[]>`
    SELECT "id", "entityType", "entityId", "content",
           ("vector" <=> ${vectorLiteral}::vector) AS distance
    FROM "Embedding"
    ORDER BY "vector" <=> ${vectorLiteral}::vector
    LIMIT ${limit}
  `;

  return rows;
}