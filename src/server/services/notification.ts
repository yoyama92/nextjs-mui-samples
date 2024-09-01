import type { PrismClient } from "@/server/infrastructures/client";

export const findList = (prisma: PrismClient) => {
  return async (userId: number) => {
    const result = await prisma.notificationTarget.findMany({
      select: {
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
        title: notification.title,
        content: notification.content,
        read: value.read,
      };
    });
  };
};

export const readNotification = (prisma: PrismClient) => {
  return async (notificationId: number, userId: number) => {
    return await prisma.notificationTarget.updateMany({
      data: {
        read: true,
      },
      where: {
        notificationId: notificationId,
        userId: userId,
      },
    });
  };
};
