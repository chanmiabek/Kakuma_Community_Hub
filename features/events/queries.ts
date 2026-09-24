import { prisma } from "@/lib/db";

export async function listUpcomingEvents() {
  return prisma.event.findMany({
    where: { isPublished: true, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
  });
}