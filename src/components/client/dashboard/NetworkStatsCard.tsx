import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChartStats } from "./charts/BarChartStats";
import { PieChartStats } from "./charts/PieChartStats";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const barData = [
  { name: "Nov 1", value: 7 },
  { name: "Nov 2", value: 12 },
  { name: "Nov 3", value: 58 },
  { name: "Nov 4", value: 29 },
  { name: "Nov 5", value: 59 },
  { name: "Nov 6", value: 117 },
  { name: "Nov 7", value: 205 },
  { name: "Nov 8", value: 232 },
  { name: "Nov 9", value: 414 },
  { name: "Nov 10", value: 466 },
  { name: "Nov 11", value: 741 },
  { name: "Nov 12", value: 812 },
  { name: "Nov 13", value: 835 },
  { name: "Nov 14", value: 713 },
  { name: "Nov 15", value: 612 },
];

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
  const { data: networkStats } = useNetworkStats(profile?.id);
  const queryClient = useQueryClient();

  const { data: membersStatus } = useQuery({
    queryKey: ['networkMembersStatus', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return null;

      // Primeiro, buscar os IDs dos usuários na rede
      const { data: networkData } = await supabase
        .from('network')
        .select('user_id')
        .eq('parent_id', networkStats?.id);

      if (!networkData || networkData.length === 0) {
        return {
          active: 0,
          inactive: 0
        };
      }

      const networkUserIds = networkData.map(item => item.user_id);

      // Agora buscar os perfis apenas dos usuários na rede
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('status, blocked')
        .in('id', networkUserIds);

      if (error) {
        console.error("Error fetching profiles:", error);
        return {
          active: 0,
          inactive: 0
        };
      }

      if (!profilesData) return {
        active: 0,
        inactive: 0
      };

      const active = profilesData.filter(p => p.status === 'active' && !p.blocked).length;
      const inactive = profilesData.filter(p => p.status !== 'active' || p.blocked).length;

      return {
        active,
        inactive
      };
    },
    enabled: !!profile?.id && !!networkStats?.id
  });

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
          // Invalidate and refetch the query when profiles change
          queryClient.invalidateQueries({ queryKey: ['networkMembersStatus', profile.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, queryClient]);

  const pieData = [
    { 
      name: "Ativos", 
      value: membersStatus?.active || 0, 
      color: "#9b87f5" 
    },
    { 
      name: "Inativos", 
      value: membersStatus?.inactive || 0, 
      color: "#D946EF" 
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChartStats data={barData} colors={colors} />
        <PieChartStats data={pieData} />
      </CardContent>
    </Card>
  );
};