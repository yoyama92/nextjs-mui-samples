import "server-only";

import type { Session } from "next-auth";
import { getServerAuthSession } from "@/libs/auth";
import { notFound } from "next/navigation";

export const withAuthentication = async (
  children: (user: Session["user"]) => JSX.Element | Promise<JSX.Element>,
) => {
  const session = await getServerAuthSession();

  // 認証はmiddlewareに設定するので、userが未設定の場合はない想定
  if (session?.user === undefined) {
    return () => notFound();
  }
  return () => children(session.user);
};
