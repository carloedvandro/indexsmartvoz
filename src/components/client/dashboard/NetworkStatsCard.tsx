import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { formatCurrency } from "@/utils/format";

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

  // Simulated values for demonstration - you can replace these with real data later
  const cardData = [
    {
      title: "Ganhos Ativos",
      value: formatCurrency(130510),
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      chartHeight: "h-[40px]"
    },
    {
      title: "Ganhos Pendentes",
      value: formatCurrency(175035),
      gradient: "from-purple-400 via-pink-500 to-purple-500",
      chartHeight: "h-[50px]"
    },
    {
      title: "Total de Ganhos",
      value: formatCurrency(210375),
      gradient: "from-cyan-400 via-blue-500 to-indigo-500",
      chartHeight: "h-[45px]"
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg bg-gradient-to-r ${card.gradient} text-white`}
            >
              <h3 className="text-sm font-medium opacity-80">{card.title}</h3>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
              <div className="mt-4 h-[60px] flex items-end overflow-hidden">
                <div 
                  className={`w-full bg-gradient-to-t from-white/20 to-white/5 rounded-lg ${card.chartHeight} transition-all duration-500 ease-in-out`}
                  style={{
                    maskImage: 'url(/lovable-uploads/fdf35ca2-9301-40c4-b33e-9aa0a2c70bbf.png)',
                    WebkitMaskImage: 'url(/lovable-uploads/fdf35ca2-9301-40c4-b33e-9aa0a2c70bbf.png)',
                    maskSize: 'cover',
                    WebkitMaskSize: 'cover',
                    maskPosition: 'bottom',
                    WebkitMaskPosition: 'bottom'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};