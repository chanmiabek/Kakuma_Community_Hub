import { NextResponse } from "next/server";
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
  const body = await req.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const service = await prisma.service.create({
    data: { ...parsed.data, slug: slugify(parsed.data.title) },
  });
  return NextResponse.json({ service }, { status: 201 });
}