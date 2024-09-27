import {
  createTrpcRouter,
  onlyCallerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  refreshAccessToken,
  saveAuthenticatedUser,
} from "@/server/services/user";
import { z } from "zod";

export const appRouter = createTrpcRouter({
  saveAuthenticatedUser: onlyCallerProcedure
    .input(
      z.object({
        user: z.object({
          email: z.string().email(),
          name: z
            .string()
            .nullish()
            .transform((v) => v || undefined),
          role: z.enum(["user", "admin"]),
        }),
        account: z.object({
          refreshToken: z.string().optional(),
        }),
      }),
    )
    .output(z.void())
    .mutation(async ({ ctx: { db }, input }) => {
      return await saveAuthenticatedUser(db)(input.user, input.account);
    }),
  signOut: protectedProcedure
    .input(z.void())
    .output(z.void())
    .mutation(({ ctx: { session } }) => {
      console.log("signout. user=", session.user.email);
      return;
    }),
  refreshAccessToken: protectedProcedure
    .input(z.void())
    .mutation(async ({ ctx: { session, user } }) => {
      const refreshToken = user?.refreshToken;
      if (refreshToken) {
        return await refreshAccessToken(
          {
            accessToken: session.user.accessToken.token,
            refreshToken: refreshToken,
          },
          {
            role: session.user.role,
          },
        );
      }
    }),
});
