
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { motion } from "framer-motion";
import { useState } from "react";
import { WelcomeSection } from "@/components/client/dashboard/WelcomeSection";
import { DashboardCards } from "@/components/client/dashboard/DashboardCards";
import { getMonthsData, getDailyData } from "@/utils/monthsData";
import { FinancialCards } from "@/components/client/dashboard/financial-cards";
import { StatsCardsGrid } from "@/components/client/dashboard/stats/StatsCardsGrid";
import { InteractiveBrazilMap } from "@/components/client/dashboard/InteractiveBrazilMap";
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
      className="max-w-[1800px] mx-auto pt-24 -mt-[72px]"
    >
      <WelcomeSection profile={profile} />

      <FinancialCards />

      <StatsCardsGrid />

      <DashboardCards
        profile={profile}
        networkStats={networkStats}
        handleNetworkClick={handleNetworkClick}
      />

      <div className="container mb-8">
        <InteractiveBrazilMap />
      </div>
    </motion.div>
  );
}
