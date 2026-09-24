import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (q.length < 2) return NextResponse.json({ results: [] });

  const [opportunities, organizations, businesses, services] = await Promise.all([
    prisma.opportunity.findMany({
      where: { status: "OPEN", OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] },
      take: 5,
      select: { id: true, title: true, slug: true },
    }),
    prisma.organization.findMany({
      where: { isPublished: true, name: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, name: true, slug: true },
    }),
    prisma.business.findMany({
      where: { isPublished: true, name: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, name: true, slug: true },
    }),
    prisma.service.findMany({
      where: { isPublished: true, title: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, title: true, slug: true },
    }),
  ]);

  return NextResponse.json({
    results: [
      ...opportunities.map((o) => ({ type: "opportunity", label: o.title, href: `/opportunities/${o.slug}` })),
      ...organizations.map((o) => ({ type: "organization", label: o.name, href: `/organizations/${o.slug}` })),
      ...businesses.map((b) => ({ type: "business", label: b.name, href: `/businesses/${b.slug}` })),
      ...services.map((s) => ({ type: "service", label: s.title, href: `/services/${s.slug}` })),
    ],
  });
}