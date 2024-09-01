import { appRouter as notificationRouter } from "@/server/api/routers/notification";
import { createCallerFactory, createTrpcRouter } from "@/server/api/trpc";

export const appRouter = createTrpcRouter({
  notification: notificationRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
