"use client";

import HomeIcon from "@mui/icons-material/Home";
import { Button, Container, Paper, Typography } from "@mui/material";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { signOut } from "next-auth/react";
import type { ReactNode } from "react";

const messages: Record<
  number,
  {
    message: string;
    action?: {
      href?: string;
      text?: string;
      icon?: ReactNode;
      onClick?: () => void;
    };
  }
> = {
  [StatusCodes.UNAUTHORIZED]: {
    message: "申し訳ありませんが、このページを表示する権限がありません。",
    action: {
      text: "サインインページへ",
      onClick: () => {
        signOut({
          callbackUrl: "/auth/signin",
        });
      },
    },
  },
  [StatusCodes.NOT_FOUND]: {
    message:
      "お探しのページは見つかりませんでした。URLが正しいかご確認ください。",
  },
  [StatusCodes.FORBIDDEN]: {
    message: "申し訳ありませんが、このページへのアクセスは許可されていません。",
  },
  [StatusCodes.BAD_REQUEST]: {
    message: "リクエストに問題がありました。入力内容を再確認してください",
  },
};

export const Errors = ({ status }: { status: number }) => {
  if (!(status in messages)) {
    return <Errors status={StatusCodes.BAD_REQUEST} />;
  }

  const statusCode = messages[status];
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <Paper
        sx={{
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom={true}>
          {`${status} ${getReasonPhrase(status)}`}
        </Typography>
        <Typography variant="body1" gutterBottom={true}>
          {statusCode.message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={statusCode.action?.icon ?? <HomeIcon />}
          href={
            statusCode.action?.onClick === undefined
              ? (statusCode.action?.href ?? "/")
              : undefined
          }
          onClick={statusCode.action?.onClick}
        >
          {statusCode.action?.text ?? "Homeへ"}
        </Button>
      </Paper>
    </Container>
  );
};
