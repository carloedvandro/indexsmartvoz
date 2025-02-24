
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { ExpenseDistributionCard } from "./charts/ExpenseDistributionCard";
import { MonthlyPerformanceChart } from "./charts/MonthlyPerformanceChart";
import { generateCardData, generateRevenueData } from "./utils/statsUtils";
import { Card } from "@/components/ui/card";
import { DollarSign, LineChart, TrendingUp } from "lucide-react";

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || '');
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['networkData', profile?.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, queryClient]);

  return (
    <div className="px-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-[#7BC043] text-white rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Saldo Disponível</p>
              <p className="text-2xl font-semibold">R$ 5.000,01</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-[#FFB84D] text-white rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Ganhos até hoje</p>
              <p className="text-2xl font-semibold">R$ 42.576,22</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-[#45B6FE] text-white rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Previsão de Ganhos</p>
              <p className="text-2xl font-semibold">R$ 0,00</p>
            </div>
          </div>
        </Card>
      </div>

      <ExpenseDistributionCard />
      <MonthlyPerformanceChart />
    </div>
  );
};
