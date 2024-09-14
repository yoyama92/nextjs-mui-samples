import { errorPath } from "@/libs/navigation";
import { StatusCodes } from "http-status-codes";
import {
  type NextMiddlewareWithAuth,
  type NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { type NextFetchEvent, NextResponse } from "next/server";

const rewriteToErrorPage = (
  statusCode: StatusCodes,
  request: NextRequestWithAuth,
) => {
  return NextResponse.rewrite(
    new URL(errorPath(statusCode), request.nextUrl.origin),
  );
};

const authMiddleware = (request: NextRequestWithAuth) => {
  const token = request.nextauth.token;
  if (!token) {
    return rewriteToErrorPage(StatusCodes.UNAUTHORIZED, request);
  }
};

const adminMiddleware = (request: NextRequestWithAuth) => {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.nextauth.token;
    if (!token) {
      return rewriteToErrorPage(StatusCodes.UNAUTHORIZED, request);
    }
    if (token.role !== "admin") {
      return rewriteToErrorPage(StatusCodes.FORBIDDEN, request);
    }
  }
};

const publicMiddleware = (
  request: NextRequestWithAuth,
): NextResponse<unknown> | undefined => {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  const publicPaths = ["errors", "/auth/signin"];
  return publicPaths.some((p) => {
    return request.nextUrl.pathname.startsWith(p);
  })
    ? NextResponse.next()
    : undefined;
};

const chainMiddlewares = (middlewares: NextMiddlewareWithAuth[]) => {
  return async (
    request: NextRequestWithAuth,
    event: NextFetchEvent,
  ): Promise<ReturnType<NextMiddlewareWithAuth>> => {
    const [current, ...nextMiddlewares] = middlewares;
    if (current) {
      const next = chainMiddlewares(nextMiddlewares);
      const nextMiddlewareResult = await current(request, event);
      if (nextMiddlewareResult) {
        return nextMiddlewareResult;
      }
      return await next(request, event);
    }
    return NextResponse.next();
  };
};

export const middleware = withAuth(
  async (request: NextRequestWithAuth, event: NextFetchEvent) => {
    return await chainMiddlewares([
      publicMiddleware,
      authMiddleware,
      adminMiddleware,
    ])(request, event);
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
