import { getServerAuthSession } from "@/libs/auth";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";

export default async () => {
  const session = await getServerAuthSession();
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
            signIn: false,
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
          {
            path: "/admin/notifications",
            name: "通知一覧",
            signIn: true,
          },
          {
            path: "/markdown",
            name: "マークダウン",
          },
          {
            path: "/articles",
            name: "microCMSで入稿したブログ",
          },
        ]
          .filter((v) => {
            if (v.signIn) {
              return session?.user !== undefined;
            }
            if (v.signIn === false) {
              return session?.user === undefined;
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
