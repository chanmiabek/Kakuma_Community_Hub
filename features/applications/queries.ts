import { prisma } from "@/lib/db";

export async function listMyApplications(userId: string) {
  return prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { opportunity: { include: { organization: true } } },
  });
}