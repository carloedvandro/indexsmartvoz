
import { NotificationsHeader } from "./NotificationsHeader";
import { NotificationsList } from "./NotificationsList";

export function NotificationsContent() {
  return (
    <div className="space-y-6">
      <NotificationsHeader />
      <NotificationsList />
    </div>
  );
}
