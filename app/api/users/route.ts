import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/features/auth/validations";

function databaseUnavailable(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    ["P1001", "P1002", "P1008", "P1017"].includes(String(error.code))
  );
}

function databaseErrorResponse(error: unknown) {
  if (databaseUnavailable(error)) {
    return NextResponse.json(
      { error: "Database is unavailable. Start PostgreSQL and try again." },
      { status: 503 },
    );
  }

  console.error("User API database operation failed", error);
  return NextResponse.json({ error: "Unable to process users right now." }, { status: 500 });
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      take: 100,
    });
    return NextResponse.json({ users });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: parsed.data.role,
        profile: { create: {} },
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    return databaseErrorResponse(error);
  }
}
