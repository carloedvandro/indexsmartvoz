import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { BarChartStats } from "./charts/BarChartStats";
import { PieChartStats } from "./charts/PieChartStats";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";

// Gera dados dos últimos 15 dias
const generateInitialBarData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      value: 0
    });
  }
  
  return data;
};

const colors = [
  "#FF6B6B",
  "#FFA07A",
  "#FFD700",
  "#98FB98",
  "#87CEEB",
  "#9B87F5",
  "#DDA0DD",
  "#FF69B4",
  "#FF1493",
];

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || '');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!profile?.id) return;

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

  const barData = generateInitialBarData();

  const countMembersByStatus = (members: any[]) => {
    let active = 0;
    let pending = 0;

    const countStatus = (member: any) => {
      if (member.user.status === 'active') {
        active++;
      } else {
        pending++;
      }

      if (member.children && member.children.length > 0) {
        member.children.forEach(countStatus);
      }
    };

    members.forEach(countStatus);
    return { active, pending };
  };

  const memberCounts = networkData ? countMembersByStatus(networkData) : { active: 0, pending: 0 };

  const pieData = [
    { 
      name: "Ativos", 
      value: memberCounts.active, 
      color: "#9b87f5" 
    },
    { 
      name: "Pendentes", 
      value: memberCounts.pending, 
      color: "#D946EF" 
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <BarChartStats data={barData} colors={colors} />
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <PieChartStats data={pieData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};