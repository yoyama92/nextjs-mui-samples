import type { PrismaClient } from "@/server/infrastructures/client";

export const findList = (prisma: PrismaClient) => {
  return async (userId: number) => {
    const result = await prisma.notificationTarget.findMany({
      select: {
        id: true,
        read: true,
        notification: {
          select: {
            id: true,
            title: true,
            content: true,
          },
        },
      },
      where: {
        userId: userId,
      },
      orderBy: {
        notification: {
          updatedAt: "desc",
        },
      },
    });

    return result.map(({ notification, ...value }) => {
      return {
        id: notification.id,
        targetId: value.id,
        title: notification.title,
        content: notification.content,
        read: value.read,
      };
    });
  };
};

export const readNotification = (prisma: PrismaClient) => {
  return async (id: number, userId: number, value: boolean) => {
    return await prisma.notificationTarget.update({
      data: {
        read: value,
      },
      where: {
        id: id,
        userId: userId,
      },
    });
  };
};
