"use server";

import { prisma } from "@/lib/db";
import { registerSchema, type RegisterInput } from "./validations";
import bcrypt from "bcryptjs";

export async function registerUser(input: RegisterInput) {
  const parsed = registerSchema.parse(input);
  const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(parsed.password, 10);
  return prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      passwordHash,
      role: parsed.role,
      profile: { create: {} },
    },
  });
}