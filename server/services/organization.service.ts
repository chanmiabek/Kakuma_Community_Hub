import { prisma } from "@/lib/db";
export const organizationService = {
  async getBySlug(slug: string) { return prisma.organization.findUnique({ where: { slug }, include: { opportunities: true } }); },
};
