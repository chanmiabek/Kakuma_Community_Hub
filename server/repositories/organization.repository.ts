import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const organizationRepository = {
  findMany: (args?: Prisma.OrganizationFindManyArgs) => prisma.organization.findMany(args),
  findBySlug: (slug: string) => prisma.organization.findUnique({ where: { slug } }),
  findByOwner: (ownerId: string) => prisma.organization.findUnique({ where: { ownerId } }),
  create: (data: Prisma.OrganizationCreateInput) => prisma.organization.create({ data }),
  update: (id: string, data: Prisma.OrganizationUpdateInput) =>
    prisma.organization.update({ where: { id }, data }),
};