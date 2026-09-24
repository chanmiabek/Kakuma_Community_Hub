import { prisma } from "@/lib/db";

export async function searchOrganizations(q: string) {
  return prisma.organization.findMany({
    where: { isPublished: true, name: { contains: q, mode: "insensitive" } },
    take: 10,
  });
}