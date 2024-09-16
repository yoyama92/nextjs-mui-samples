import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import { getServerAuthSession } from "@/libs/auth";
import { prisma } from "@/server/infrastructures/client";
import { findUserByEmail } from "@/server/services/user";

export const createTrpcContext = async (opts: { headers: Headers }) => {
  const session = (await getServerAuthSession()) ?? undefined;
  const db = prisma;

  return {
    session: session,
    db: db,
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

export const loggedProcedure = t.procedure.use(async (opts) => {
  const start = Date.now();

  const result = await opts.next();

  const durationMs = Date.now() - start;
  const meta = { path: opts.path, type: opts.type, durationMs };

  if (result.ok) {
    console.log("OK request timing:", meta);
  } else {
    console.error("Non-OK request timing", meta);
  }

  return result;
});

export const publicProcedure = loggedProcedure;

export const onlyCallerProcedure = publicProcedure.use(({ ctx, next }) => {
  const secret = ctx.headers.get("x-trpc-secret");
  if (secret !== process.env.TRPC_SECRET) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = ctx.session;
  if (!session?.user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await findUserByEmail(ctx.db)(session.user.email);
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!user.refreshToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: session,
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
