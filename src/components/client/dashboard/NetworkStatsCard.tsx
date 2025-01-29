import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { NetworkLevelsChart } from "./charts/NetworkLevelsChart";
import { RevenueChartEffects } from "./charts/RevenueChartEffects";
import { generateCardData, generateRevenueData } from "./utils/statsUtils";

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
  const cardData = generateCardData();
  const revenueData = generateRevenueData();

  return (
    <div className="h-full">
      <NetworkStatsHeader />
      <div className="space-y-8">
        <NetworkStatsGrid cardData={cardData} />
        <div className="grid grid-cols-1 gap-6 px-0">
          <NetworkLevelsChart />
          <RevenueChartEffects data={revenueData} effect="wave" lineStyle="glow" />
          <RevenueChartEffects data={revenueData} effect="float" lineStyle="glow" />
          <RevenueChartEffects data={revenueData} effect="flip" lineStyle="glow" />
          <RevenueChartEffects data={revenueData} effect="tilt" lineStyle="glow" />
          <RevenueChartEffects data={revenueData} effect="pulse" lineStyle="glow" />
        </div>
      </div>
    </div>
  );
};