import { prisma } from "@/lib/db";

export const businessService = {
  async listPublished() {
    return prisma.business.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });
  },

  async getBySlug(slug: string) {
    return prisma.business.findUnique({
      where: { slug },
      include: { products: true, services: true },
    });
  },

  async getByOwner(ownerId: string) {
    return prisma.business.findUnique({ where: { ownerId }, include: { products: true, services: true } });
  },
};