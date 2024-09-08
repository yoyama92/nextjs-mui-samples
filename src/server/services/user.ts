import type { PrismaClient } from "@prisma/client";

export const findUserByEmail = (prisma: PrismaClient) => {
  return async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };
};
