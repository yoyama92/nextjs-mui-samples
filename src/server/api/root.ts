import { appRouter as notificationRouter } from "@/server/api/routers/notification";
import { appRouter as microcmsRouter } from "@/server/api/routers/microcms";

import { createCallerFactory, createTrpcRouter } from "@/server/api/trpc";

export const appRouter = createTrpcRouter({
  notification: notificationRouter,
  microcms: microcmsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
