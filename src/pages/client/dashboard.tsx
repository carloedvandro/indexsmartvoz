
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DollarSign, LineChart, TrendingUp } from "lucide-react";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  const handleNetworkClick = () => {
    navigate("/client/network");
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
      <ParticlesBackground />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1800px] mx-auto pt-24 -mt-[72px]">
            <div className="px-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-[#212529] text-white rounded-xl flex items-center gap-4">
                  <div className="p-4 bg-white/10 rounded-full">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base opacity-80">Saldo Disponível</p>
                    <p className="text-2xl font-medium">R$ 5.000,01</p>
                  </div>
                </Card>

                <Card className="p-6 bg-[#212529] text-white rounded-xl flex items-center gap-4">
                  <div className="p-4 bg-white/10 rounded-full">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base opacity-80">Ganhos até hoje</p>
                    <p className="text-2xl font-medium">R$ 42.576,22</p>
                  </div>
                </Card>

                <Card className="p-6 bg-[#212529] text-white rounded-xl flex items-center gap-4">
                  <div className="p-4 bg-white/10 rounded-full">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base opacity-80">Previsão de Ganhos</p>
                    <p className="text-2xl font-medium">R$ 0,00</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="w-full">
                <ProfileCard profile={profile} />
              </div>
              <div className="w-full">
                <NetworkCard 
                  networkStats={networkStats} 
                  onClick={handleNetworkClick} 
                />
              </div>
              <div className="w-full">
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
