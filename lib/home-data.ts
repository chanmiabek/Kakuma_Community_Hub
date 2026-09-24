import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

export const getHomeData = unstable_cache(async () => {
  try {
    const [opportunities, stats] = await Promise.all([
      prisma.opportunity.findMany({ where: { status: "OPEN" }, orderBy: { publishedAt: "desc" }, take: 3, include: { organization: { select: { name: true, slug: true, logoUrl: true } } } }),
      Promise.all([prisma.opportunity.count({ where: { status: "OPEN" } }), prisma.organization.count({ where: { isPublished: true } }), prisma.business.count({ where: { isPublished: true } }), prisma.user.count()]),
    ]);
    return { opportunities, stats };
  } catch {
    return { opportunities: [], stats: [0, 0, 0, 0] as [number, number, number, number] };
  }
}, ["home-page-data"], { revalidate: 60, tags: ["home-page"] });
