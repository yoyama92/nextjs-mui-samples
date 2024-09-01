import { prisma } from "@/libs/prisma";

export { prisma };

export type PrismaClient = typeof prisma;
