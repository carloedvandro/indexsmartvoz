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

interface NetworkMemberRPC {
  id: string;
  user_id: string;
  parent_id: string;
  level: number;
}

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);
  const queryClient = useQueryClient();

  const { data: membersStatus } = useQuery({
    queryKey: ['networkMembersStatus', profile?.id],
    queryFn: async () => {
      if (!profile?.id || !networkStats?.id) return null;

      console.log("Fetching members status for network:", networkStats.id);

      // Primeiro, buscar o ID da rede do usuário atual
      const { data: userNetwork, error: userNetworkError } = await supabase
        .from('network')
        .select('id')
        .eq('user_id', profile.id)
        .single();

      if (userNetworkError) {
        console.error("Error fetching user network:", userNetworkError);
        return null;
      }

      if (!userNetwork) {
        console.log("No network found for user");
        return {
          active: 0,
          pending: 0
        };
      }

      // Buscar todos os membros da rede recursivamente usando a função RPC
      const { data: allNetworkData, error: networkError } = await supabase
        .rpc('get_all_network_members', { 
          root_network_id: userNetwork.id 
        }) as { data: NetworkMemberRPC[] | null, error: any };

      if (networkError) {
        console.error("Error fetching network members:", networkError);
        return {
          active: 0,
          pending: 0
        };
      }

      if (!allNetworkData || allNetworkData.length === 0) {
        console.log("No network members found");
        return {
          active: 0,
          pending: 0
        };
      }

      const networkUserIds = allNetworkData.map(item => item.user_id);
      console.log("Network user IDs:", networkUserIds);

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('status')
        .in('id', networkUserIds);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        return {
          active: 0,
          pending: 0
        };
      }

      if (!profilesData) {
        console.log("No profiles found");
        return {
          active: 0,
          pending: 0
        };
      }

      console.log("Profiles data:", profilesData);

      const active = profilesData.filter(p => p.status === 'active').length;
      const pending = profilesData.filter(p => p.status === 'pending').length;

      console.log("Active members:", active);
      console.log("Pending members:", pending);

      return {
        active,
        pending
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
      name: "Pendentes", 
      value: membersStatus?.pending || 0, 
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