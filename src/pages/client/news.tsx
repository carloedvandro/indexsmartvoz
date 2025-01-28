import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { Newspaper } from "lucide-react";

export default function ClientNews() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto pt-8">
            <div className="px-4">
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <Newspaper className="w-16 h-16 text-muted-foreground" />
                <h2 className="text-2xl font-semibold">Notícias</h2>
                <p className="text-muted-foreground">
                  Em breve você poderá ver nossas notícias aqui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}