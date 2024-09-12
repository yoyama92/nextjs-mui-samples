import { Box } from "@mui/material";

import { NotificationTable } from "@/components/NotificationTable";
import { getCaller } from "@/libs/trpc";

export default async () => {
  const caller = await getCaller();
  const notifications = await caller.notification.findAll();
  return (
    <Box>
      <NotificationTable notifications={notifications} />
    </Box>
  );
};
