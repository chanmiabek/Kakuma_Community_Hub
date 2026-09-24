import { prisma } from "@/lib/db";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserWithProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, skills: { include: { skill: true } } },
  });
}