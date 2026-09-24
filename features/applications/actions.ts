"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { applicationSchema } from "./validations";

export async function createApplication(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = applicationSchema.parse(input);

  return prisma.application.create({
    data: { ...data, userId: session.user.id },
  });
}