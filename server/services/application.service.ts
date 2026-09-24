import { prisma } from "@/lib/db";

export const applicationService = {
  async listForUser(userId: string) {
    return prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { opportunity: { include: { organization: true } } },
    });
  },

  async listForOrganization(ownerId: string) {
    return prisma.application.findMany({
      where: { opportunity: { organization: { ownerId } } },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
        opportunity: { select: { id: true, title: true } },
      },
    });
  },

  async updateStatus(id: string, status: Parameters<typeof prisma.application.update>[0]["data"]["status"]) {
    return prisma.application.update({ where: { id }, data: { status, reviewedAt: new Date() } });
  },
};