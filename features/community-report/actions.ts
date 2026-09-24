"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { communityReportSchema } from "./validations";

export async function createCommunityReport(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = communityReportSchema.parse(input);

  return prisma.communityReport.create({
    data: { ...data, authorId: session.user.id },
  });
}