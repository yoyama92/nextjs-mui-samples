import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

import { getServerAuthSession } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async () => {
  const session = await getServerAuthSession();
  if (session?.user === undefined) {
    redirect("/auth/signin");
  }
  const user = session.user;
  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          {user.image && (
            <CardMedia>
              <Image
                src={user.image}
                alt="account image"
                width={42}
                height={42}
              />
            </CardMedia>
          )}
          <Typography variant="body1" component="div">
            名前：{user.name}
          </Typography>
          <Typography variant="body1" component="div">
            メールアドレス：{user.email}
          </Typography>
          <Typography variant="body1" component="div">
            ロール：{user.role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
