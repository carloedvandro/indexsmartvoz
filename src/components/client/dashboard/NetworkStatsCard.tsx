import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { BarChartStats } from "./charts/BarChartStats";
import { PieChartStats } from "./charts/PieChartStats";
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
      color: "rgba(155, 135, 245, 0.8)" 
    },
    { 
      name: "Inativos", 
      value: memberCounts.pending, 
      color: "rgba(217, 70, 239, 0.8)" 
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
          <div className="aspect-[16/9] w-full">
            <PieChartStats data={pieData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};