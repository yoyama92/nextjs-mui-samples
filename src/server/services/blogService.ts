import type { PrismaClient } from "@prisma/client";

export const addBrowsingHistory = (prisma: PrismaClient) => {
  return async (userId: number, contentId: string) => {
    return await prisma.blogBrowsingHistory.create({
      data: {
        userId: userId,
        contentId: contentId,
      },
    });
  };
};
