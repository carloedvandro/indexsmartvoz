
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DollarSign, LineChart, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/format";

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
                <Card 
                  className="relative px-6 py-4 bg-[#9b67fb] text-white rounded-xl border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleBalanceCardClick}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-1">
                      <img 
                        src="/lovable-uploads/84108351-37b9-4b60-acce-8689d183c3de.png" 
                        alt="Invoice icon" 
                        className="w-10 h-10" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold">{formatCurrency(610690.89)}</p>
                      <p className="text-sm font-light">Total de saldo</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className="relative px-6 py-4 bg-[#9b67fb] text-white rounded-xl border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleEarningsCardClick}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-1">
                      <img 
                        src="/lovable-uploads/84108351-37b9-4b60-acce-8689d183c3de.png" 
                        alt="Invoice icon" 
                        className="w-10 h-10" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold">{formatCurrency(42576.22)}</p>
                      <p className="text-sm font-light">Ganhos até hoje</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className="relative px-6 py-4 bg-[#9b67fb] text-white rounded-xl border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleForecastCardClick}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-1">
                      <img 
                        src="/lovable-uploads/84108351-37b9-4b60-acce-8689d183c3de.png" 
                        alt="Invoice icon" 
                        className="w-10 h-10" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold">{formatCurrency(0)}</p>
                      <p className="text-sm font-light">Previsão de Ganhos</p>
                    </div>
                  </div>
                </Card>
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
