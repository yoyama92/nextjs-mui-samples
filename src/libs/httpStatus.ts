import { StatusCodes } from "http-status-codes";
import type { ReactNode } from "react";

export const messages: Record<
  number,
  {
    message: string;
    action?: {
      href: string;
      text: string;
      icon: ReactNode;
    };
  }
> = {
  [StatusCodes.UNAUTHORIZED]: {
    message: "申し訳ありませんが、このページを表示する権限がありません。",
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
