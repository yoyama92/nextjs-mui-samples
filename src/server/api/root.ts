import { appRouter as notificationRouter } from "@/server/api/routers/notification";
import { appRouter as microcmsRouter } from "@/server/api/routers/microcms";
import { appRouter as userRouter } from "@/server/api/routers/user";
import { createCallerFactory, createTrpcRouter } from "@/server/api/trpc";

export const appRouter = createTrpcRouter({
  notification: notificationRouter,
  microcms: microcmsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
