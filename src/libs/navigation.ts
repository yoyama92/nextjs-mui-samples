import "server-only";

import type { StatusCodes } from "http-status-codes";

export const errorPath = (statusCode: StatusCodes) => {
  return `/errors/${statusCode}?${new URLSearchParams({
    key: process.env.ERROR_SECRET ?? "",
  }).toString()}`;
};
