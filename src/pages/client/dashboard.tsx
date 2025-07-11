import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { WelcomeSection } from "@/components/client/dashboard/WelcomeSection";
import { DashboardCard } from "@/components/client/dashboard/DashboardCards";
import { getMonthsData, getDailyData } from "@/utils/monthsData";
import { FinancialCards } from "@/components/client/dashboard/financial-cards";
import { StatsCardsGrid } from "@/components/client/dashboard/stats/StatsCardsGrid";
import { InteractiveBrazilMap } from "@/components/client/dashboard/InteractiveBrazilMap";
import { NetworkCard } from "@/components/client/dashboard/NetworkCard";
import { PlansCard } from "@/components/client/dashboard/PlansCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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

  // Check validation status
  useEffect(() => {
    const selfie = localStorage.getItem('selfieBase64');
    if (!selfie) {
      navigate('/client/facial-biometry');
      return;
    }
  }, [navigate]);

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate('/');
  };

  if (!profile) {
    return null;
  }

  const dailyData = getDailyData(activeDay);

  return (
    <div className="min-h-screen bg-[#2f145e] text-white font-sans flex flex-col items-center p-5">
      <h1 className="mt-8 text-2xl font-semibold">Bem-vindo à sua área!</h1>
      
      <div className="bg-white text-[#2f145e] rounded-xl p-5 my-5 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-2.5">Cadastro validado</h2>
        <p>Seu documento foi aprovado com sucesso. Agora você tem acesso completo à plataforma.</p>
      </div>

      <Button 
        onClick={handleLogout}
        className="mt-8 px-5 py-2.5 bg-white text-[#2f145e] hover:bg-gray-100 font-bold rounded-lg"
      >
        Sair
      </Button>

      {/* Original dashboard content - hidden for now to match the simple design */}
      <div className="hidden">
        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="max-w-[1800px] mx-auto pt-24 -mt-[72px]">
          <WelcomeSection profile={profile} />
          <FinancialCards />
          <StatsCardsGrid />
          <div className="container mb-8 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="bg-white rounded-lg shadow-sm border border-gray-120 p-4">
                <NetworkCard networkStats={networkStats || {
                level1Count: 0,
                level2Count: 0,
                level3Count: 0,
                level4Count: 0
              }} onClick={handleNetworkClick} />
              </div>
              <PlansCard />
            </div>
          </div>
          <div className="container mb-8">
            <InteractiveBrazilMap />
          </div>
        </motion.div>
      </div>
    </div>
  );
}