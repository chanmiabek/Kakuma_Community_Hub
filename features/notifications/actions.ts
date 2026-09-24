"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function markAllRead() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.notification.updateMany({
    where: { userId: session.user.id, readAt: null },
    data: { readAt: new Date() },
  });
}