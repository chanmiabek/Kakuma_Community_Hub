"use server";

import { auth } from "@/lib/auth";
import { recommendationService } from "@/server/services/recommendation.service";

export async function getMyRecommendations(limit = 10) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return recommendationService.forUser(session.user.id, limit);
}