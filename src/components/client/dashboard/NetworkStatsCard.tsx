import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { BarChartStats } from "./charts/BarChartStats";
import { PieChartStats } from "./charts/PieChartStats";
import { CalendarStats } from "./charts/CalendarStats";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { useChartData } from "@/hooks/useChartData";
import { countMembersByStatus } from "@/utils/networkStats";

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || '');
  const queryClient = useQueryClient();
  const { barData } = useChartData();

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
          queryClient.invalidateQueries({ queryKey: ['networkData', profile.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, queryClient]);

  const memberCounts = networkData ? countMembersByStatus(networkData) : { active: 0, pending: 0 };

  const pieData = [
    { 
      name: "Ativos", 
      value: memberCounts.active, 
      color: "#33C3F0" 
    },
    { 
      name: "Inativos", 
      value: memberCounts.pending, 
      color: "#D3E4FD" 
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8">
          <div className="aspect-[16/9] w-full">
            <BarChartStats data={barData} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="aspect-square w-full">
              <PieChartStats data={pieData} title="Ativos" value={75} />
            </div>
            <div className="aspect-square w-full">
              <PieChartStats data={pieData} title="Inativos" value={82} />
            </div>
            <div className="aspect-square w-full">
              <PieChartStats data={pieData} title="Total" value={65} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-[16/9] w-full">
              <BarChartStats data={barData} />
            </div>
          </div>
          <div className="w-full">
            <CalendarStats />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};