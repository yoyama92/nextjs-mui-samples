import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import { getServerAuthSession } from "@/libs/auth";
import { prisma } from "@/server/infrastructures/client";
import { findUserByEmail } from "../services/user";

export const createTrpcContext = async (opts: { headers: Headers }) => {
  const session = (await getServerAuthSession()) ?? undefined;
  const db = prisma;

  return {
    session,
    db,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTrpcContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTrpcRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await findUserByEmail(ctx.db)(ctx.session.user.email);
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
      user: user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next();
});
