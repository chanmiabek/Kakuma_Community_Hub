"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { organizationSchema } from "./validations";

export async function upsertOrganization(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = organizationSchema.parse(input);

  return prisma.organization.upsert({
    where: { ownerId: session.user.id },
    update: data,
    create: { ...data, ownerId: session.user.id, slug: slugify(data.name) },
  });
}