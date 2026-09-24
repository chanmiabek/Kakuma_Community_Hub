import { prisma } from "@/lib/db";
import { scoreOpportunity } from "@/ai/recommendations/score";
import { rankRecommendations } from "@/ai/recommendations/rank";
import { explainRecommendation } from "@/ai/recommendations/explain";

export const recommendationService = {
  async forUser(userId: string, limit = 10) {
    const [user, applications] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        include: { skills: { include: { skill: true } }, profile: true },
      }),
      prisma.application.findMany({ where: { userId }, select: { opportunityId: true } }),
    ]);

    const appliedIds = new Set(applications.map((a) => a.opportunityId));

    const candidates = await prisma.opportunity.findMany({
      where: { status: "OPEN", id: { notIn: [...appliedIds] } },
      take: 60,
      include: { organization: { select: { name: true, slug: true, logoUrl: true } } },
    });

    const userSkillNames = user?.skills.map((s) => s.skill.name) ?? [];

    const scored = candidates.map((opportunity) => {
      const score = scoreOpportunity({
        opportunity,
        userSkills: userSkillNames,
        userLocation: user?.location ?? null,
        userExperience: user?.profile?.yearsExperience ?? 0,
      });
      return { opportunity, score, reason: explainRecommendation(opportunity, userSkillNames) };
    });

    return rankRecommendations(scored, limit);
  },
};