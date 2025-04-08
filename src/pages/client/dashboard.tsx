
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
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "@/styles/logo.css"; // Ensure the logo styles are imported

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);
  const [activeMonth, setActiveMonth] = useState("Abr");

  const handleNetworkClick = () => {
    navigate("/client/network");
  };

  if (!profile) {
    return null;
  }

  const months = [
    { month: "Jan", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Fev", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Mar", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Abr", day: "25", active: true, upValue: 0, downValue: 0 },
    { month: "Mai", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Jun", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Jul", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Ago", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Set", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Out", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Nov", day: "25", active: false, upValue: 0, downValue: 0 },
    { month: "Dez", day: "25", active: false, upValue: 0, downValue: 0 },
  ];

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
            {/* Seção de boas-vindas */}
            <div className="px-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold text-[#0E1C36]">Olá, {profile.full_name?.split(' ')[0] || 'Usuário'}</h1>
                <p className="text-gray-600 mt-1">Aqui está uma visão geral das contas da sua empresa:</p>
              </div>
            </div>

            {/* Meses com indicadores e setas de navegação */}
            <div className="px-6 mb-6 relative">
              <Carousel className="w-full" opts={{ align: "start" }}>
                <CarouselPrevious className="left-2 lg:left-0 z-10 shadow-md hover:bg-gray-100 bg-white text-gray-800" />
                <CarouselContent className="py-2">
                  {months.map((monthData, index) => (
                    <CarouselItem key={index} className="basis-auto md:basis-1/3 lg:basis-1/5 pl-2 pr-2 first:pl-2 last:pr-2">
                      <MonthCard 
                        month={monthData.month} 
                        day={monthData.day} 
                        active={monthData.month === activeMonth} 
                        onClick={() => setActiveMonth(monthData.month)}
                        upValue={monthData.upValue}
                        downValue={monthData.downValue}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className="right-2 lg:right-0 z-10 shadow-md hover:bg-gray-100 bg-white text-gray-800" />
              </Carousel>
            </div>

            {/* Resumo financeiro */}
            <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-1">Até o momento</h2>
                <p className="text-sm text-gray-500 mb-4">Fev 25</p>
                
                <div className="bg-green-50 p-3 rounded-md mb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-green-500 mr-2">↑</div>
                      <div>
                        <div className="text-green-600 font-medium">Entrou</div>
                        <div className="text-sm text-green-500">Receitas</div>
                      </div>
                    </div>
                    <div className="text-right">{formatCurrency(0)}</div>
                  </div>
                </div>
                
                <div className="bg-red-50 p-3 rounded-md mb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-red-500 mr-2">↓</div>
                      <div>
                        <div className="text-red-600 font-medium">Saiu</div>
                        <div className="text-sm text-red-500">Despesas</div>
                      </div>
                    </div>
                    <div className="text-right">- {formatCurrency(0)}</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-gray-800 mr-2">→</div>
                      <div>
                        <div className="text-gray-800 font-medium">Sobrou</div>
                        <div className="text-sm text-gray-500">Saldo</div>
                      </div>
                    </div>
                    <div className="text-right">{formatCurrency(0)}</div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">*Estes valores não consideram retiradas e aportes de sócio. Representam só as movimentações da operação da empresa.</p>
              </div>
              
              <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-1">Comparação</h2>
                <p className="text-sm text-gray-500 mb-4">com o período anterior</p>
                
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-400">Gráfico de comparação</p>
                </div>
              </div>
              
              <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-1">Para acontecer</h2>
                <p className="text-sm text-gray-500 mb-4">próximas 25 receitas e despesas futuras</p>
                
                <div className="flex flex-col items-center justify-center h-64">
                  <img src="/lovable-uploads/827312bb-9514-49ad-abe8-a83fa4a06324.png" alt="Nada por aqui" className="w-24 opacity-30" />
                  <p className="text-gray-400 mt-4">Nada por aqui...</p>
                </div>
                
                <div className="flex justify-between items-center mt-6 border-t pt-4">
                  <div className="font-bold">Saldo total:</div>
                  <div className="font-bold text-xl">{formatCurrency(0)}</div>
                </div>
              </div>
            </div>

            {/* Cards originais */}
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

// Componente para os cards de mês
function MonthCard({ 
  month, 
  day, 
  active, 
  onClick,
  upValue = 0,
  downValue = 0
}: { 
  month: string, 
  day: string, 
  active: boolean,
  onClick: () => void,
  upValue?: number,
  downValue?: number
}) {
  return (
    <div 
      className={`min-w-full p-4 rounded-xl text-center ${active ? 'bg-[#0E1C36] text-white' : 'bg-white text-gray-700'} shadow cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <div className="font-medium">{month} {day}</div>
      <div className="flex justify-center mt-2 text-sm">
        <span className={`mr-2 ${active ? 'text-green-400' : 'text-green-500'}`}>↑ {upValue}</span>
        <span className={active ? 'text-red-400' : 'text-red-500'}>↓ {downValue}</span>
      </div>
    </div>
  );
}
