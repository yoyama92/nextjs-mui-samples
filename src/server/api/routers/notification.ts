import { createTrpcRouter, protectedProcedure } from "@/server/api/trpc";
import { findList, readNotification } from "@/server/services/notification";
import { z } from "zod";

export const appRouter = createTrpcRouter({
  findList: protectedProcedure
    .input(z.undefined())
    .query(async ({ ctx: { db, user } }) => {
      return await findList(db)(user.id);
    }),

  read: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx: { db, user }, input }) => {
      return await readNotification(db)(input, user.id);
    }),
});
