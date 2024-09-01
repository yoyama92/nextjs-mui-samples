"use client";

import { Box, Button, Stack } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const handleSignIn = (provider?: string) => {
  signIn(provider, {
    redirect: false,
    callbackUrl: "/auth/profile",
  }).catch((error: unknown) => {
    console.error(error);
  });
};

export default () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <Box>loading...</Box>;
  }

  if (session.status === "authenticated") {
    router.replace("/auth/profile");
  }

  return (
    <Stack spacing={1} direction="row">
      <Button variant="contained" onClick={() => handleSignIn("google")}>
        Sign in with Google1
      </Button>
      <Button variant="contained" onClick={() => handleSignIn("google2")}>
        Sign in with Google2
      </Button>
    </Stack>
  );
};
