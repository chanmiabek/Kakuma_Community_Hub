import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { opportunityService } from "@/server/services/opportunity.service";
import { opportunitySchema } from "@/features/opportunities/validations";
import { parsePagination } from "@/lib/pagination";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { page, perPage } = parsePagination(Object.fromEntries(searchParams));
  const result = await opportunityService.search({
    q: searchParams.get("q") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    page,
    perPage,
  });
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const org = await prisma.organization.findUnique({ where: { ownerId: session.user.id } });
  if (!org) return NextResponse.json({ error: "No organization profile" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = opportunitySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await opportunityService.create(org.id, parsed.data);
  return NextResponse.json({ opportunity: created }, { status: 201 });
}