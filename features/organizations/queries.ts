import { prisma } from "@/lib/db";

export async function getOrganizationBySlug(slug: string) {
  return prisma.organization.findUnique({ where: { slug } });
}