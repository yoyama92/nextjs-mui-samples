import { authConfig } from "@/libs/auth.config";
import { Box, Link, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import NextLink from "next/link";

export default async () => {
  const session = await getServerSession(authConfig);
  return (
    <Box>
      <Box
        component="ul"
        sx={{
          paddingInlineStart: 3,
        }}
      >
        {[
          {
            path: "/file-upload",
            name: "ファイルアップロード",
          },
          {
            path: "/auth/signin",
            name: "サインイン",
          },
          {
            path: "/auth/profile",
            name: "サインインユーザー情報",
            signIn: true,
          },
          {
            path: "/app-bar",
            name: "App Bar",
            signIn: true,
          },
        ]
          .filter((v) => {
            if (v.signIn) {
              return session?.user !== undefined;
            }
            return true;
          })
          .map((v) => {
            return (
              <Typography component="li" key={v.path}>
                <Link component={NextLink} href={v.path}>
                  {v.name}
                </Link>
              </Typography>
            );
          })}
      </Box>
    </Box>
  );
};
