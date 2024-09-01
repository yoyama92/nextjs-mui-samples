import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  findList: protectedProcedure
    .input(z.undefined())
    .query(({ ctx: { session, db } }) => {
      return [
        {
          id: 1,
          title: "通知１",
          text: "通知１の本文です。",
        },
        {
          id: 2,
          title: "通知２",
          text: "通知２の本文です。",
        },
        {
          id: 3,
          title: "通知３",
          text: "通知３の本文です。通知３の本文です。通知３の本文です。通知３の本文です。通知３の本文です。通知３の本文です。通知３の本文です。",
        },
      ];
    }),
});
