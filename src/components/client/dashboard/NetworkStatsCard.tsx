import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { BarChartStats } from "./charts/BarChartStats";
import { PieChartStats } from "./charts/PieChartStats";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";

const generateInitialBarData = () => {
  const data = [];
  const today = new Date();
  
  const baseValues = [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62];
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomVariation = Math.floor(Math.random() * 5);
    const value = baseValues[14 - i] + randomVariation;
    
    data.push({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      value: value,
      previousValue: value - Math.floor(Math.random() * 8)
    });
  }
  
  return data;
};

const colors = [
  "rgba(155, 135, 245, 0.5)",  // Roxo
  "rgba(217, 70, 239, 0.5)",   // Rosa
  "rgba(14, 165, 233, 0.5)",   // Azul
  "rgba(249, 115, 22, 0.5)",   // Laranja
  "rgba(34, 197, 94, 0.5)",    // Verde
  "rgba(236, 72, 153, 0.5)",   // Pink
  "rgba(59, 130, 246, 0.5)",   // Azul claro
  "rgba(245, 158, 11, 0.5)",   // Âmbar
  "rgba(139, 92, 246, 0.5)",   // Violeta
];

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
      color: "rgba(155, 135, 245, 0.8)" 
    },
    { 
      name: "Pendentes", 
      value: memberCounts.pending, 
      color: "rgba(217, 70, 239, 0.8)" 
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2 pl-5">
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="pl-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[150px] sm:h-[200px] md:h-[300px]">
            <BarChartStats data={barData} colors={colors} />
          </div>
          <div className="h-[150px] sm:h-[200px] md:h-[300px] flex items-center justify-center">
            <PieChartStats data={pieData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
