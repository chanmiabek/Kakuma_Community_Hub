import { recommendationService } from "@/server/services/recommendation.service";
import { prisma } from "@/lib/db";

/**
 * Recompute recommendations for active users and log them.
 * Trigger from a cron job / scheduled function.
 */
export async function runRecommendationJob(limitUsers = 100) {
  const users = await prisma.user.findMany({
    where: { isActive: true, role: "USER" },
    take: limitUsers,
    select: { id: true },
  });

  for (const user of users) {
    const recs = await recommendationService.forUser(user.id, 5);
    for (const r of recs) {
      await prisma.recommendationLog.create({
        data: {
          userId: user.id,
          opportunityId: r.opportunity.id,
          score: r.score,
          reason: r.reason,
        },
      });
    }
  }

  return { processed: users.length };
}