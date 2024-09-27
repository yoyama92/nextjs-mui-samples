// biome-ignore lint/correctness/noUndeclaredDependencies: <explanation>
import "server-only";

import { Errors } from "@/components/Errors";
import { getTRPCErrorFromUnknown } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { StatusCodes } from "http-status-codes";

const errors: Record<TRPC_ERROR_CODE_KEY, StatusCodes> = {
  UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  PARSE_ERROR: StatusCodes.BAD_REQUEST,
  BAD_REQUEST: StatusCodes.BAD_REQUEST,
  INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED: StatusCodes.BAD_REQUEST,
  FORBIDDEN: StatusCodes.FORBIDDEN,
  NOT_FOUND: StatusCodes.NOT_FOUND,
  METHOD_NOT_SUPPORTED: StatusCodes.METHOD_NOT_ALLOWED,
  TIMEOUT: StatusCodes.REQUEST_TIMEOUT,
  CONFLICT: StatusCodes.CONFLICT,
  PRECONDITION_FAILED: StatusCodes.PRECONDITION_FAILED,
  PAYLOAD_TOO_LARGE: StatusCodes.REQUEST_TOO_LONG,
  UNPROCESSABLE_CONTENT: StatusCodes.UNPROCESSABLE_ENTITY,
  TOO_MANY_REQUESTS: StatusCodes.TOO_MANY_REQUESTS,
  CLIENT_CLOSED_REQUEST: StatusCodes.BAD_REQUEST,
};

export const ErrorHandler = ({ error }: { error: unknown }) => {
  const trpcError = getTRPCErrorFromUnknown(error);
  return <Errors status={errors[trpcError.code] ?? StatusCodes.BAD_REQUEST} />;
};
