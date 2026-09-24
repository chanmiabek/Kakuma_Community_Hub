import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { organizationSchema } from "@/features/organizations/validations";
import { slugify } from "@/lib/utils";

export async function GET() {
  const organizations = await prisma.organization.findMany({ where: { isPublished: true } });
  return NextResponse.json({ organizations });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = organizationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const org = await prisma.organization.upsert({
    where: { ownerId: session.user.id },
    update: parsed.data,
    create: {
      ...parsed.data,
      ownerId: session.user.id,
      slug: slugify(parsed.data.name),
    },
  });
  return NextResponse.json({ organization: org });
}