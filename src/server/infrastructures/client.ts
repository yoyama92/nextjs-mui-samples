import { prisma } from "@/libs/prisma";

export { prisma };

export type PrismClient = typeof prisma;
