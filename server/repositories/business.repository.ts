import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const businessRepository = {
  findMany: (args?: Prisma.BusinessFindManyArgs) => prisma.business.findMany(args),
  findBySlug: (slug: string) => prisma.business.findUnique({ where: { slug } }),
  findByOwner: (ownerId: string) => prisma.business.findUnique({ where: { ownerId } }),
  create: (data: Prisma.BusinessCreateInput) => prisma.business.create({ data }),
  update: (id: string, data: Prisma.BusinessUpdateInput) =>
    prisma.business.update({ where: { id }, data }),
};