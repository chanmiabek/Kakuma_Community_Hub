import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { applicationSchema } from "@/features/applications/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    include: { opportunity: true },
  });
  return NextResponse.json({ applications });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const existing = await prisma.application.findUnique({
    where: {
      opportunityId_userId: {
        opportunityId: parsed.data.opportunityId,
        userId: session.user.id,
      },
    },
  });
  if (existing) return NextResponse.json({ error: "Already applied" }, { status: 409 });

  const application = await prisma.application.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  await prisma.notification.create({
    data: {
      userId: session.user.id,
      type: "APPLICATION_UPDATE",
      title: "Application submitted",
      body: "Your application was submitted successfully.",
    },
  });

  return NextResponse.json({ application }, { status: 201 });
}