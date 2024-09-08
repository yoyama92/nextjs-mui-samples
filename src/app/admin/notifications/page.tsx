import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import { NotificationTable } from "@/components/NotificationTable";
import { getServerAuthSession } from "@/libs/auth";
import { getCaller } from "@/libs/trpc";

export default async () => {
  const session = await getServerAuthSession();
  if (session?.user === undefined) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  const caller = await getCaller();
  const notifications = await caller.notification.findAll();
  return (
    <Box>
      <NotificationTable notifications={notifications} />
    </Box>
  );
};
