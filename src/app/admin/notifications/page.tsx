import { Box } from "@mui/material";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { NotificationTable } from "@/components/NotificationTable";
import { getServerAuthSession } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createCaller } from "@/server/api/root";

export default async () => {
  const session = await getServerAuthSession();
  if (session?.user === undefined) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const caller = createCaller({
    headers: headers(),
    session: session,
    db: prisma,
  });

  const notifications = await caller.notification.findAll();
  return (
    <Box>
      <NotificationTable notifications={notifications} />
    </Box>
  );
};
