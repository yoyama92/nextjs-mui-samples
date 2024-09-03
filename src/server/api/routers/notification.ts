import { addMinutes, format } from "date-fns";
import { z } from "zod";

import {
  adminProcedure,
  createTrpcRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  findAll,
  findList,
  readNotification,
} from "@/server/services/notification";

export const appRouter = createTrpcRouter({
  findList: protectedProcedure
    .input(z.undefined())
    .query(async ({ ctx: { db, user } }) => {
      return await findList(db)(user.id);
    }),
  findAll: adminProcedure
    .input(z.undefined())
    .output(
      z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          content: z.string(),
          createdAt: z
            .date()
            .transform((date) =>
              format(
                addMinutes(date, date.getTimezoneOffset()),
                "yyyy-MM-dd'T'HH:mm:ss+09:00",
              ),
            ),
          updatedAt: z
            .date()
            .transform((date) =>
              format(
                addMinutes(date, date.getTimezoneOffset()),
                "yyyy-MM-dd'T'HH:mm:ss+09:00",
              ),
            ),
          users: z.array(
            z.object({
              id: z.number(),
              name: z.string().optional(),
              read: z.boolean(),
            }),
          ),
        }),
      ),
    )
    .query(async ({ ctx: { db } }) => {
      return await findAll(db)();
    }),
  read: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        read: z.boolean(),
      }),
    )
    .output(
      z.object({
        notificationId: z.number(),
        read: z.boolean(),
      }),
    )
    .mutation(async ({ ctx: { db, user }, input }) => {
      return await readNotification(db)(input.id, user.id, input.read);
    }),
});
