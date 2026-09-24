import { prisma } from "@/lib/db";

export async function listOpenOpportunities(limit = 20) {
  return prisma.opportunity.findMany({
    where: { status: "OPEN" },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { organization: { select: { name: true, slug: true } } },
  });
}