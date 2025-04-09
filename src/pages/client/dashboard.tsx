
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { WelcomeSection } from "@/components/client/dashboard/WelcomeSection";
import { MonthsCarousel } from "@/components/client/dashboard/MonthsCarousel";
import { FinancialSummary } from "@/components/client/dashboard/FinancialSummary";
import { DashboardCards } from "@/components/client/dashboard/DashboardCards";
import { getMonthsData, getDailyData } from "@/utils/monthsData";
import "@/styles/logo.css"; // Ensure the logo styles are imported

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);
  const [activeMonth, setActiveMonth] = useState("Abr");
  const [activeDay, setActiveDay] = useState("");

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  if (!profile) {
    return null;
  }

  // Use daily data instead of monthly data
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
            <MonthsCarousel 
              months={dailyData} 
              activeMonth={activeMonth}
              setActiveMonth={setActiveMonth}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
            />
            <FinancialSummary 
              activeMonth={activeMonth}
              monthsData={dailyData}
            />
            <DashboardCards 
              profile={profile}
              networkStats={networkStats}
              handleNetworkClick={handleNetworkClick}
            />
          </div>
        </div>
      </main>
    </motion.div>
  );
}
