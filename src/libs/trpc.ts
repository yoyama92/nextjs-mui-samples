import "server-only";

import { createCaller } from "@/server/api/root";
import { prisma } from "@/server/infrastructures/client";
import { headers } from "next/headers";
import { getServerAuthSession } from "./auth";

export const getCaller = async () => {
  const session = (await getServerAuthSession()) ?? undefined;
  const caller = createCaller({
    headers: headers(),
    session: session,
    db: prisma,
  });
  return caller;
};
