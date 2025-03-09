
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { motion } from "framer-motion";
import { DollarSign, LineChart, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  const handleBalanceCardClick = () => {
    // Navega para a página de financeiro resumo
    navigate("/client/financial");
  };

  const handleEarningsCardClick = () => {
    // Abre o dialog de detalhes dos ganhos
    navigate("/client/financial/details", {
      state: { 
        type: "earnings",
        showDetails: true
      }
    });
  };
  
  const handleForecastCardClick = () => {
    // Navega para a página de previsão de ganhos
    navigate("/client/earnings-forecast");
  };

  if (!profile) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden relative"
    >
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1800px] mx-auto pt-24 -mt-[72px]">
            <div className="px-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={handleBalanceCardClick} className="cursor-pointer">
                  <StatsCard
                    title="Saldo Disponível"
                    value="R$ 5.000,01"
                  />
                </div>

                <div onClick={handleEarningsCardClick} className="cursor-pointer">
                  <StatsCard
                    title="Ganhos até hoje"
                    value="R$ 42.576,22"
                  />
                </div>

                <div onClick={handleForecastCardClick} className="cursor-pointer">
                  <StatsCard
                    title="Previsão de Ganhos"
                    value="R$ 0,00"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="w-full bg-transparent">
                <ProfileCard profile={profile} />
              </div>
              <div className="w-full bg-transparent">
                <NetworkCard 
                  networkStats={networkStats} 
                  onClick={handleNetworkClick} 
                />
              </div>
              <div className="w-full bg-transparent">
                <PlansCard />
              </div>
            </div>
            <NetworkStatsCard />
          </div>
        </div>
      </main>
    </motion.div>
  );
}
