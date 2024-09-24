import { createTrpcRouter, protectedProcedure } from "@/server/api/trpc";
import { createFilePresignedUrl } from "@/server/services/fileService";
import { z } from "zod";

export const appRouter = createTrpcRouter({
  fetchPresignedUrl: protectedProcedure
    .input(z.string())
    .output(z.string().optional())
    .query(async ({ input }) => {
      const presignedUrl = await createFilePresignedUrl(input);
      return presignedUrl;
    }),
});
