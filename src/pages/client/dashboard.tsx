
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { NetworkStatsCard } from "@/components/client/dashboard/NetworkStatsCard";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { CommissionsChart } from "@/components/client/dashboard/charts/CommissionsChart";
import { NetworkLevelsChart } from "@/components/client/dashboard/charts/NetworkLevelsChart";
import { motion } from "framer-motion";

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
          <div className="max-w-[1800px] mx-auto pt-6">
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
                <NetworkStatsCard />
              </div>
            </div>
            <div className="px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CommissionsChart />
              <NetworkLevelsChart />
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
