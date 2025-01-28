import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";

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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white">
            <h3 className="text-sm font-medium opacity-80">Membros Ativos</h3>
            <p className="text-2xl font-bold mt-2">{memberCounts.active}</p>
            <div className="mt-4 h-[60px] flex items-end">
              <div className="w-full bg-gradient-to-t from-white/20 to-white/5 rounded-lg h-[40px]"></div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white">
            <h3 className="text-sm font-medium opacity-80">Membros Pendentes</h3>
            <p className="text-2xl font-bold mt-2">{memberCounts.pending}</p>
            <div className="mt-4 h-[60px] flex items-end">
              <div className="w-full bg-gradient-to-t from-white/20 to-white/5 rounded-lg h-[50px]"></div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
            <h3 className="text-sm font-medium opacity-80">Total de Membros</h3>
            <p className="text-2xl font-bold mt-2">{memberCounts.active + memberCounts.pending}</p>
            <div className="mt-4 h-[60px] flex items-end">
              <div className="w-full bg-gradient-to-t from-white/20 to-white/5 rounded-lg h-[45px]"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};