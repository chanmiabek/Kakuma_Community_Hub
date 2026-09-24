import { prisma } from "@/lib/db";
import { generateEmbedding } from "@/ai/embeddings/generate";

/**
 * Generate embeddings for newly published opportunities.
 */
export async function runEmbeddingJob(batchSize = 50) {
  const opportunities = await prisma.opportunity.findMany({
    where: { status: "OPEN", embeddings: { none: {} } },
    take: batchSize,
  });

  for (const opp of opportunities) {
    const content = `${opp.title}\n\n${opp.description}\n\n${opp.category}\n${opp.tags.join(", ")}`;
    const vector = await generateEmbedding(content);

    await prisma.$executeRaw`
      INSERT INTO "Embedding" ("id", "entityType", "entityId", "opportunityId", "content", "vector", "createdAt")
      VALUES (gen_random_uuid()::text, 'opportunity', ${opp.id}, ${opp.id}, ${content}, ${vector}::vector, NOW())
    `;
  }

  return { processed: opportunities.length };
}