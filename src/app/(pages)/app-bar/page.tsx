import { PrimaryAppBar } from "@/components/AppBar";
import { Errors } from "@/components/Errors";
import { getServerAuthSession } from "@/libs/auth";
import { StatusCodes } from "http-status-codes";

export default async () => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return <Errors status={StatusCodes.UNAUTHORIZED} />;
  }
  return <PrimaryAppBar user={session.user} />;
};
