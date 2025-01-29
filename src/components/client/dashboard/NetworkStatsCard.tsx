import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { RevenueChart } from "./charts/RevenueChart";
import { ExpenseDistributionCard } from "./charts/ExpenseDistributionCard";
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
          queryClient.invalidateQueries({ queryKey: ['networkData', profile?.id] });
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
    <div className="flex flex-col items-center w-full max-w-[1800px] mx-auto">
      <NetworkStatsHeader />
      <div className="w-full space-y-8 px-2 md:px-4">
        <NetworkStatsGrid cardData={cardData} />
        <ExpenseDistributionCard />
        <div className="w-full max-w-[1800px] mx-auto">
          <RevenueChart data={revenueData} />
        </div>
      </div>
    </div>
  );
};