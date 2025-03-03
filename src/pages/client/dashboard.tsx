
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
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

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
      <ParticlesBackground style="default" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1800px] mx-auto pt-24 -mt-[72px]">
            <div className="px-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="relative p-6 bg-[#5f0889]/90 backdrop-blur-sm text-white rounded-lg border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleBalanceCardClick}
                >
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Saldo Disponível</p>
                      <p className="text-2xl font-semibold">R$ 5.000,01</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className="relative p-6 bg-[#5f0889]/90 backdrop-blur-sm text-white rounded-lg border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleEarningsCardClick}
                >
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <LineChart className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Ganhos até hoje</p>
                      <p className="text-2xl font-semibold">R$ 42.576,22</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className="relative p-6 bg-[#5f0889]/90 backdrop-blur-sm text-white rounded-lg border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleForecastCardClick}
                >
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Previsão de Ganhos</p>
                      <p className="text-2xl font-semibold">R$ 0,00</p>
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
