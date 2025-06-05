
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { NotificationsContent } from "@/components/client/notifications/NotificationsContent";

export default function ClientNotifications() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto pt-8 px-4 pb-8">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0 h-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </div>
            <NotificationsContent />
          </div>
        </div>
      </main>
    </div>
  );
}
