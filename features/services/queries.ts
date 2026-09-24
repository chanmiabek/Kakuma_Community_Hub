import { prisma } from "@/lib/db";

export async function listServices(category?: string) {
  return prisma.service.findMany({
    where: { isPublished: true, ...(category && { category }) },
    orderBy: { createdAt: "desc" },
  });
}