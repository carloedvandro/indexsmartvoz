import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { motion } from "framer-motion";
import { useState } from "react";
import { WelcomeSection } from "@/components/client/dashboard/WelcomeSection";
import { DashboardCard } from "@/components/client/dashboard/DashboardCards";
import { getMonthsData, getDailyData } from "@/utils/monthsData";
import { FinancialCards } from "@/components/client/dashboard/financial-cards";
import { StatsCardsGrid } from "@/components/client/dashboard/stats/StatsCardsGrid";
import { InteractiveBrazilMap } from "@/components/client/dashboard/InteractiveBrazilMap";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { InteractivePlanCard } from "@/components/client/dashboard/InteractivePlanCard";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import "@/styles/logo.css";
export default function ClientDashboard() {
  const navigate = useNavigate();
  const {
    data: profile,
    refetch
  } = useProfile();
  const {
    data: networkStats
  } = useNetworkStats(profile?.id);
  const [activeMonth, setActiveMonth] = useState("Abr");
  const [activeDay, setActiveDay] = useState("");
  const handleNetworkClick = () => {
    navigate("/client/network");
  };
  if (!profile) {
    return null;
  }
  const dailyData = getDailyData(activeDay);
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="max-w-[1800px] mx-auto pt-24 -mt-[72px]">
      <WelcomeSection profile={profile} />

      <FinancialCards />

      <StatsCardsGrid />

      <div className="container mb-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-120 p-4">
              <ProfileCard profile={profile} />
            </div>
          </div>
          
          {/* Network Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-120 p-4">
              <NetworkCard networkStats={networkStats || {
                level1Count: 0,
                level2Count: 0,
                level3Count: 0,
                level4Count: 0
              }} onClick={handleNetworkClick} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-8">
        <InteractivePlanCard />
      </div>

      <div className="container mb-8">
        <InteractiveBrazilMap />
      </div>
    </motion.div>;
}