import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { createTrpcContext } from "@/server/api/trpc";

/**
 * tRPC's HTTP response handler
 * @link https://trpc.io/docs/server/adapters/nextjs
 */
const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req,
    router: appRouter,
    createContext: () =>
      createTrpcContext({
        headers: req.headers,
      }),
  });
};

export { handler as GET, handler as POST };
