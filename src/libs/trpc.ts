import "server-only";

import { getServerAuthSession } from "@/libs/auth";
import { createCaller } from "@/server/api/root";
import { prisma } from "@/server/infrastructures/client";
import type { Session } from "next-auth";

type Props = {
  session?: Session;
  headers?: Headers;
};

export const getCaller = async (props?: Props) => {
  const reqHeaders = new Headers(props?.headers);
  reqHeaders.set("x-trpc-secret", process.env.TRPC_SECRET ?? "");
  const caller = createCaller({
    headers: reqHeaders,
    session: props?.session || ((await getServerAuthSession()) ?? undefined),
    db: prisma,
  });
  return caller;
};
