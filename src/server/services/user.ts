import type { PrismaClient } from "@/server/infrastructures/client";

export const findUserByEmail = (prisma: PrismaClient) => {
  return async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };
};
