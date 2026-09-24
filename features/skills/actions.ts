"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { skillSchema } from "./validations";

export async function addMySkill(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = skillSchema.parse(input);

  const skill = await prisma.skill.upsert({
    where: { slug: slugify(data.name) },
    update: {},
    create: { name: data.name, slug: slugify(data.name), category: data.category },
  });

  return prisma.userSkill.upsert({
    where: { userId_skillId: { userId: session.user.id, skillId: skill.id } },
    update: { level: data.level, years: data.years },
    create: { userId: session.user.id, skillId: skill.id, level: data.level, years: data.years },
  });
}