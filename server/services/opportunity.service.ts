import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

type SearchArgs = {
  q?: string;
  type?: string;
  category?: string;
  location?: string;
  page?: number;
  perPage?: number;
};

export const opportunityService = {
  async search({ q, type, category, location, page = 1, perPage = 20 }: SearchArgs) {
    const where: Prisma.OpportunityWhereInput = {
      status: "OPEN",
      ...(type && { type: type as Prisma.OpportunityWhereInput["type"] }),
      ...(category && { category }),
      ...(location && { location: { contains: location, mode: "insensitive" } }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { tags: { has: q } },
        ],
      }),
    };

    const [items, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
        include: { organization: { select: { name: true, slug: true, logoUrl: true } } },
      }),
      prisma.opportunity.count({ where }),
    ]);

    return { items, total, page, perPage, totalPages: Math.ceil(total / perPage) };
  },

  async getByIdOrSlug(idOrSlug: string) {
    return prisma.opportunity.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      include: { organization: true },
    });
  },

  async incrementViews(id: string) {
    return prisma.opportunity.update({ where: { id }, data: { views: { increment: 1 } } });
  },

  async create(organizationId: string, data: Prisma.OpportunityUncheckedCreateInput extends infer _ ? any : any) {
    const d = data as { title: string; description?: string; type?: any; category?: string };
    return prisma.opportunity.create({
      data: {
        ...d,
        description: d.description ?? "",
        type: d.type ?? "JOB",
        category: d.category ?? "General",
        slug: slugify(d.title) + "-" + Math.random().toString(36).slice(2, 7),
        organizationId,
        status: "OPEN",
        publishedAt: new Date(),
      },
    });
  },
};


