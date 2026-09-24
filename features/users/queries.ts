import { prisma } from "@/lib/db";

export async function listUsers(limit = 50) {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, name: true, email: true, role: true, image: true },
  });
}