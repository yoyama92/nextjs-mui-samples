import { Errors } from "@/components/Errors";
import { StatusCodes } from "http-status-codes";

export default () => {
  return <Errors status={StatusCodes.NOT_FOUND.toString()} />;
};
