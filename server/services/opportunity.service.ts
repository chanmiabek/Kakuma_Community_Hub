import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { OPPORTUNITY_TYPES } from "@/config/categories";
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
    const normalizedQuery = q?.trim();
    const normalizedLocation = location?.trim();
    const validType = OPPORTUNITY_TYPES.find((candidate) => candidate === type);
    const conditions: Prisma.OpportunityWhereInput[] = [];

    if (validType) {
      conditions.push({ type: validType });
    }

    if (category?.trim()) {
      conditions.push({ category: category.trim() });
    }

    if (normalizedLocation) {
      if (normalizedLocation.toLocaleLowerCase() === "remote") {
        conditions.push({
          OR: [
            { isRemote: true },
            { location: { contains: normalizedLocation, mode: "insensitive" } },
          ],
        });
      } else {
        conditions.push({
          location: { contains: normalizedLocation, mode: "insensitive" },
        });
      }
    }

    if (normalizedQuery) {
      conditions.push({
        OR: [
          { title: { contains: normalizedQuery, mode: "insensitive" } },
          { description: { contains: normalizedQuery, mode: "insensitive" } },
          { tags: { has: normalizedQuery } },
        ],
      });
    }

    const where: Prisma.OpportunityWhereInput = {
      status: "OPEN",
      ...(conditions.length > 0 ? { AND: conditions } : {}),
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


