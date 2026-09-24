import { prisma } from "@/lib/db";

export const userRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  list: (take = 50) => prisma.user.findMany({ orderBy: { createdAt: "desc" }, take }),
  create: (data: Parameters<typeof prisma.user.create>[0]["data"]) => prisma.user.create({ data }),
  update: (id: string, data: Parameters<typeof prisma.user.update>[0]["data"]) =>
    prisma.user.update({ where: { id }, data }),
  delete: (id: string) => prisma.user.delete({ where: { id } }),
};