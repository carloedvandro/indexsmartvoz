
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { NotificationsContent } from "@/components/client/notifications/NotificationsContent";

export default function ClientNotifications() {
  return (
    <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto pt-8 px-4 pb-8">
            <NotificationsContent />
          </div>
        </div>
      </main>
    </div>
  );
}
