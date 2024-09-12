import { z } from "zod";

import { createTrpcRouter, protectedProcedure } from "@/server/api/trpc";
import { getDetail, getList } from "@/server/services/microcms";
import { TRPCError } from "@trpc/server";
import { addBrowsingHistory } from "@/server/services/blogService";

export const appRouter = createTrpcRouter({
  getList: protectedProcedure
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
  getDetail: protectedProcedure
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
  addBrowsingHistory: protectedProcedure
    .input(z.object({ contentId: z.string() }))
    .output(z.void())
    .mutation(async ({ ctx: { db, user }, input: { contentId } }) => {
      await addBrowsingHistory(db)(user.id, contentId);
    }),
});
