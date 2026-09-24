"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { opportunitySchema } from "./validations";

export async function createOpportunity(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const org = await prisma.organization.findUnique({ where: { ownerId: session.user.id } });
  if (!org) throw new Error("No organization profile");

  const data = opportunitySchema.parse(input);
  return prisma.opportunity.create({
    data: { ...data, slug: slugify(data.title), organizationId: org.id },
  });
}