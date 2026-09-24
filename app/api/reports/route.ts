import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { communityReportSchema } from "@/features/community-reports/validations";

export async function GET() {
  const reports = await prisma.communityReport.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, image: true } } },
  });
  return NextResponse.json({ reports });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = communityReportSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const report = await prisma.communityReport.create({
    data: { ...parsed.data, authorId: session.user.id },
  });
  return NextResponse.json({ report }, { status: 201 });
}