import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (user) {
    const token = randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
      data: { identifier: user.email, token, expires: new Date(Date.now() + 3600_000) },
    });
    // In production, send an email here.
  }

  return NextResponse.json({ ok: true });
}