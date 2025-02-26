
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { Banner } from "@/components/ui/banner";

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

  const memberCounts = networkData ? countMembersByStatus(networkData) : { active: 0, pending: 0 };

  return (
    <div className="mt-4">
      <Banner
        id="network-stats"
        variant="rainbow"
        message={`🎉 Sua rede possui ${memberCounts.active} membros ativos e ${memberCounts.pending} membros pendentes!`}
        height="3rem"
        className="mb-4"
      />
    </div>
  );
};
