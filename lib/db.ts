import * as Prisma from '@prisma/client'

const PrismaClient = (Prisma as any).PrismaClient
type PrismaClient = InstanceType<typeof PrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma