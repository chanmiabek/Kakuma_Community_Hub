import { prisma } from "@/lib/db";

export async function getBusinessBySlug(slug: string) {
  return prisma.business.findUnique({ where: { slug }, include: { products: true, services: true } });
}