import { PrismaClient } from '@prisma/client';

// If an existing Prisma Client instance exists, use that. Otherwise, we'll create one.
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export { prismaClient };