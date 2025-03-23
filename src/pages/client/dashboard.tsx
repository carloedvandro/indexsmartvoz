
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
import { formatCurrency } from "@/utils/format";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  const handleBalanceCardClick = () => {
    navigate("/client/financial");
  };

  const handleEarningsCardClick = () => {
    navigate("/client/financial/details", {
      state: { 
        type: "earnings",
        showDetails: true
      }
    });
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className="relative px-6 py-4 bg-[#4c0470] text-white rounded-xl border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleBalanceCardClick}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <img 
                        src="/lovable-uploads/9c458018-4e54-4993-92c1-bf40c3e95228.png" 
                        alt="Dollar sign" 
                        className="h-16 w-16" 
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{formatCurrency(610690.89)}</p>
                      <p className="text-sm font-light mt-1">Total de saldo</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  className="relative px-6 py-4 bg-[#4c0470] text-white rounded-xl border-0 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleEarningsCardClick}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <img 
                        src="/lovable-uploads/9c458018-4e54-4993-92c1-bf40c3e95228.png" 
                        alt="Dollar sign" 
                        className="h-16 w-16" 
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{formatCurrency(42576.22)}</p>
                      <p className="text-sm font-light mt-1">Ganhos até hoje</p>
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
