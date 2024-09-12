"use client";

import { trpc } from "@/trpc/client";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    const contentId = pathname.split("/").slice(-1)[0];
    trpc.microcms.addBrowsingHistory.mutate({
      contentId: contentId,
    });
  }, [pathname]);
  return <>{children}</>;
};
