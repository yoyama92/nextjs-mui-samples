import { Box } from "@mui/material";

import { PrimaryAppBar } from "@/components/AppBar";
import type { Session } from "next-auth";
import { withAuthentication } from "@/providers/withAuthentication";

export default await withAuthentication((user: Session["user"]) => {
  return (
    <Box>
      <PrimaryAppBar user={user} />
    </Box>
  );
});
