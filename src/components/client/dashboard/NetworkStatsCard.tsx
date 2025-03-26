
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { ExpenseDistributionCard } from "./charts/ExpenseDistributionCard";
import { MonthlyPerformanceChart } from "./charts/MonthlyPerformanceChart";
import { generateCardData, generateRevenueData } from "./utils/statsUtils";
import { useNetworkMembersStatus } from "./hooks/useNetworkMembersStatus";

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || '');
  const queryClient = useQueryClient();
  const [cardData, setCardData] = useState<any[]>([]);

  // Get network ID for current user
  const [networkId, setNetworkId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchNetworkId = async () => {
      if (profile?.id) {
        const { data } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", profile.id)
          .maybeSingle();
        
        if (data) {
          setNetworkId(data.id);
        }
      }
    };
    
    fetchNetworkId();
  }, [profile?.id]);

  // Use the specialized hook for fetching members status
  const { data: memberCounts } = useNetworkMembersStatus(profile?.id, networkId);

  useEffect(() => {
    const loadCardData = async () => {
      const data = await generateCardData();
      setCardData(data);
    };
    
    loadCardData();
  }, []);

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
          queryClient.invalidateQueries({ queryKey: ['networkMembersStatus', profile?.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, queryClient]);

  const revenueData = generateRevenueData();

  return (
    <div className="px-6">
      <NetworkStatsHeader />
      <NetworkStatsGrid cardData={cardData} />
      <ExpenseDistributionCard />
      <MonthlyPerformanceChart />
    </div>
  );
};
