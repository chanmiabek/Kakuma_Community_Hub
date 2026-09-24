import { prisma } from "@/lib/db";

export async function listCommunityReports() {
  return prisma.communityReport.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, image: true } } },
  });
}