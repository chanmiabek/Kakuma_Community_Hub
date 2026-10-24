import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().max(2000).optional().default(""),
  price: z.number().int().nonnegative().optional(),
  currency: z.string().trim().min(3).max(3).default("KES"),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sign in to add products." }, { status: 401 });

  const business = await prisma.business.findUnique({ where: { ownerId: session.user.id }, select: { id: true } });
  if (!business) return NextResponse.json({ error: "Create your business profile before adding products." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const product = await prisma.product.create({
    data: {
      ...parsed.data,
      slug: slugify(parsed.data.name) + "-" + Math.random().toString(36).slice(2, 7),
      businessId: business.id,
      imageUrl: parsed.data.imageUrl || null,
    },
  });
  return NextResponse.json({ product }, { status: 201 });
}
