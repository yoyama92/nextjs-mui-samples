"use client";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Stack } from "@mui/material";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <Box
      component="main"
      sx={{
        padding: "6rem",
        minHeight: "100vh",
      }}
    >
      {children}
      {pathname !== "/" && (
        <Stack spacing={1} direction="row">
          <Button
            variant="text"
            LinkComponent={NextLink}
            href="/"
            startIcon={<HomeIcon />}
            size="small"
          >
            Home
          </Button>
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            size="small"
            onClick={() => {
              signOut().catch((error: unknown) => {
                console.error(error);
              });
            }}
          >
            Sign Out
          </Button>
        </Stack>
      )}
    </Box>
  );
};
