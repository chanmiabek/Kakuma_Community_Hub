import { prisma } from "@/lib/db";

export async function listSkills() {
  return prisma.skill.findMany({ orderBy: { name: "asc" } });
}