"use server";

import { prisma } from "@/lib/db";

export async function globalSearch(q: string) {
  if (q.trim().length < 2) return [];
  return prisma.opportunity.findMany({
    where: { status: "OPEN", title: { contains: q, mode: "insensitive" } },
    take: 10,
    select: { id: true, title: true, slug: true },
  });
}