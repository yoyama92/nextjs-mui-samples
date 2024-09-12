import { Box } from "@mui/material";

import { PrimaryAppBar } from "@/components/AppBar";
import type { Session } from "next-auth";
import { authWarper } from "@/providers/authWarper";

export default authWarper((user: Session["user"]) => {
  return (
    <Box>
      <PrimaryAppBar user={user} />
    </Box>
  );
});
