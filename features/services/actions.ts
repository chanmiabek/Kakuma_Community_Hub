"use server";

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { serviceSchema } from "./validations";

export async function createService(input: unknown) {
  const data = serviceSchema.parse(input);
  return prisma.service.create({ data: { ...data, slug: slugify(data.title) } });
}