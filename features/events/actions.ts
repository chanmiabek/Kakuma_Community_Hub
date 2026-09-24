"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { eventSchema } from "./validations";

export async function createEvent(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = eventSchema.parse(input);

  const org = await prisma.organization.findUnique({ where: { ownerId: session.user.id } });

  return prisma.event.create({
    data: { ...data, slug: slugify(data.title), organizationId: org?.id },
  });
}