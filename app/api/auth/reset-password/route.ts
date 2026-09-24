import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({ token: z.string().min(10), password: z.string().min(8) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const vt = await prisma.verificationToken.findUnique({ where: { token: parsed.data.token } });
  if (!vt || vt.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.update({ where: { email: vt.identifier }, data: { passwordHash } });
  await prisma.verificationToken.delete({ where: { token: vt.token } });

  return NextResponse.json({ ok: true });
}