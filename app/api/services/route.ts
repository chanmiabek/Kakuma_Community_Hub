import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serviceSchema } from "@/features/services/validations";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const services = await prisma.service.findMany({
    where: { isPublished: true, ...(category && { category }) },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to publish a service." }, { status: 401 });
  }

  const [business, organization] = await Promise.all([
    prisma.business.findUnique({ where: { ownerId: session.user.id }, select: { id: true, verificationStatus: true } }),
    prisma.organization.findUnique({ where: { ownerId: session.user.id }, select: { id: true, verificationStatus: true } }),
  ]);
  if (!business && !organization) {
    return NextResponse.json({ error: "Create a business or organization profile first." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const isVerified = business?.verificationStatus === "VERIFIED" || organization?.verificationStatus === "VERIFIED";
  const service = await prisma.service.create({
    data: {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
      slug: slugify(parsed.data.title) + "-" + Math.random().toString(36).slice(2, 7),
      businessId: business?.id ?? null,
      organizationId: business ? null : organization?.id ?? null,
      isPublished: Boolean(isVerified),
    },
  });
  return NextResponse.json({ service }, { status: 201 });
}
