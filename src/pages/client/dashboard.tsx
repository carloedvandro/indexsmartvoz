
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { WelcomeSection } from "@/components/client/dashboard/WelcomeSection";
import { DashboardCards } from "@/components/client/dashboard/DashboardCards";
import { getMonthsData, getDailyData } from "@/utils/monthsData";
import { FinancialCards } from "@/components/client/dashboard/financial-cards";
import { StatsCardsGrid } from "@/components/client/dashboard/stats/StatsCardsGrid";
import { DetailedBrazilMap } from "@/components/client/dashboard/DetailedBrazilMap";
import "@/styles/logo.css";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile, refetch } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);
  const [activeMonth, setActiveMonth] = useState("Abr");
  const [activeDay, setActiveDay] = useState("");

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  if (!profile) {
    return null;
  }

  const dailyData = getDailyData(activeDay);

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
            <WelcomeSection profile={profile} />

            <FinancialCards />

            <StatsCardsGrid />

            <DashboardCards
              profile={profile}
              networkStats={networkStats}
              handleNetworkClick={handleNetworkClick}
            />

            <div className="container mb-8">
              <DetailedBrazilMap />
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
