import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const opportunityRepository = {
  findMany: (args?: Prisma.OpportunityFindManyArgs) => prisma.opportunity.findMany(args),
  findById: (id: string) => prisma.opportunity.findUnique({ where: { id } }),
  findBySlug: (slug: string) => prisma.opportunity.findUnique({ where: { slug } }),
  count: (args?: Prisma.OpportunityCountArgs) => prisma.opportunity.count(args),
  create: (data: Prisma.OpportunityCreateInput) => prisma.opportunity.create({ data }),
  update: (id: string, data: Prisma.OpportunityUpdateInput) =>
    prisma.opportunity.update({ where: { id }, data }),
  delete: (id: string) => prisma.opportunity.delete({ where: { id } }),
};