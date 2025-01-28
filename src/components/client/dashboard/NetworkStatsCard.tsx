import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { formatCurrency } from "@/utils/format";
import { StatCard } from "./charts/StatCard";
import { RevenueChart } from "./charts/RevenueChart";

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

  const memberCounts = networkData ? countMembersByStatus(networkData) : { active: 0, pending: 0 };

  const generateChartData = (baseValue: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      name: month,
      value: Math.floor(baseValue * (1 + Math.sin(index / 2) * 0.5))
    }));
  };

  const generateRevenueData = () => {
    const dates = Array.from({ length: 31 }, (_, i) => {
      const date = new Date(2025, 0, i + 1);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    });

    return dates.map((date) => ({
      date,
      revenue: Math.floor(Math.random() * 10000),
      projected: Math.floor(Math.random() * 12000)
    }));
  };

  const cardData = [
    {
      title: "Ganhos Ativos",
      value: formatCurrency(130510),
      data: generateChartData(130510),
      color: "#786AFF"
    },
    {
      title: "Ganhos Pendentes",
      value: formatCurrency(175035),
      data: generateChartData(175035),
      color: "#5E60CE"
    },
    {
      title: "Total de Ganhos",
      value: formatCurrency(210375),
      data: generateChartData(210375),
      color: "#7B61FF"
    }
  ];

  const revenueData = generateRevenueData();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              data={card.data}
              color={card.color}
            />
          ))}
        </div>
        <RevenueChart data={revenueData} />
      </CardContent>
    </Card>
  );
};