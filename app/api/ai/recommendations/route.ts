import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { recommendationService } from "@/server/services/recommendation.service";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const recs = await recommendationService.forUser(session.user.id, 10);
  return NextResponse.json({
    recommendations: recs.map((r) => ({
      id: r.opportunity.id,
      title: r.opportunity.title,
      score: r.score,
      reason: r.reason,
    })),
  });
}