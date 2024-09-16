import { ErrorHandler } from "@/components/ErrorHandler";
import { NotificationTable } from "@/components/NotificationTable";
import { getCaller } from "@/libs/trpc";

export default async () => {
  try {
    const caller = await getCaller();
    const notifications = await caller.notification.findAll();
    return <NotificationTable notifications={notifications} />;
  } catch (error) {
    return <ErrorHandler error={error} />;
  }
};
