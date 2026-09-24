"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { businessSchema } from "./validations";

export async function upsertBusiness(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = businessSchema.parse(input);

  return prisma.business.upsert({
    where: { ownerId: session.user.id },
    update: data,
    create: { ...data, ownerId: session.user.id, slug: slugify(data.name) },
  });
}