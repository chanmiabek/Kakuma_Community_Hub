import { prisma } from "@/lib/db";

export async function recentRecommendations(userId: string, limit = 20) {
  return prisma.recommendationLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}