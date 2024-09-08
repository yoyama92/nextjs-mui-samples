import { z } from "zod";

import { createTrpcRouter, publicProcedure } from "@/server/api/trpc";
import { getDetail, getList } from "@/server/services/microcms";
import { TRPCError } from "@trpc/server";

export const appRouter = createTrpcRouter({
  getList: publicProcedure
    .input(
      z
        .object({
          limit: z.number(),
          offset: z.number(),
        })
        .partial()
        .optional(),
    )
    .query(async ({ input }) => {
      try {
        return await getList(input);
      } catch {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
  getDetail: publicProcedure
    .input(
      z.object({
        contentId: z.string(),
        queries: z.object({}).optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getDetail(input.contentId, input.queries);
      } catch {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
});
