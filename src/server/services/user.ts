import type { PrismClient } from "@/server/infrastructures/client";

export const findUserByEmail = (prisma: PrismClient) => {
  return async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };
};
