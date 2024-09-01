import { Box } from "@mui/material";

import { getServerAuthSession } from "@/libs/auth";
import { redirect } from "next/navigation";
import { PrimaryAppBar } from "@/components/AppBar";

export default async () => {
  const session = await getServerAuthSession();
  if (session?.user === undefined) {
    redirect("/auth/signin");
  }

  return (
    <Box>
      <PrimaryAppBar user={session?.user} />
    </Box>
  );
};
