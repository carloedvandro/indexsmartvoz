
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { WelcomeSection } from "@/components/client/dashboard/WelcomeSection";
import { MonthsCarousel } from "@/components/client/dashboard/MonthsCarousel";
import { DashboardCards } from "@/components/client/dashboard/DashboardCards";
import { getMonthsData, getDailyData } from "@/utils/monthsData";
import { FinancialCards } from "@/components/client/dashboard/financial-cards";
import { BonificationChart } from "@/components/client/dashboard/bonification";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
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
      {/* Background particles effect */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground style="snow" />
      </div>
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1800px] mx-auto pt-24 -mt-[72px]">
            <WelcomeSection profile={profile} />
            
            {/* Financial Cards above the carousel */}
            <FinancialCards />
            
            <MonthsCarousel 
              months={dailyData} 
              activeMonth={activeMonth}
              setActiveMonth={setActiveMonth}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
            />
            
            {/* Bonification Chart below the carousel */}
            <BonificationChart />
            
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
