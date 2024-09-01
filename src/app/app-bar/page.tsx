import { Box } from "@mui/material";
import { getServerSession } from "next-auth";

import { authConfig } from "@/libs/auth.config";
import { redirect } from "next/navigation";
import { PrimaryAppBar } from "@/components/AppBar";

export default async () => {
  const session = await getServerSession(authConfig);
  if (session?.user === undefined) {
    redirect("/auth/signin");
  }

  return (
    <Box>
      <PrimaryAppBar user={session?.user} />
    </Box>
  );
};
