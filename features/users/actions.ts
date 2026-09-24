"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { profileSchema } from "./validations";

export async function updateMyProfile(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = profileSchema.parse(input);

  return prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      phone: data.phone,
      location: data.location,
      bio: data.bio,
      profile: {
        upsert: {
          create: { headline: data.headline, summary: data.summary, yearsExperience: data.yearsExperience ?? 0 },
          update: { headline: data.headline, summary: data.summary, yearsExperience: data.yearsExperience ?? 0 },
        },
      },
    },
  });
}