
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { NetworkStatsHeader } from "./components/NetworkStatsHeader";
import { NetworkStatsGrid } from "./components/NetworkStatsGrid";
import { generateCardData } from "./utils/statsUtils";
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
    const handleDbChanges = () => {
      if (profile?.id) {
        // Invalidate all relevant queries when data changes
        queryClient.invalidateQueries({ queryKey: ['networkData', profile.id] });
        queryClient.invalidateQueries({ queryKey: ['networkMembersStatus', profile.id] });
        queryClient.invalidateQueries({ queryKey: ['networkStats', profile.id] });
      }
    };

    // Listen for changes to the network table
    const networkChannel = supabase
      .channel('network-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'network'
        },
        handleDbChanges
      )
      .subscribe();

    // Listen for changes to profiles table
    const profilesChannel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        handleDbChanges
      )
      .subscribe();

    return () => {
      supabase.removeChannel(networkChannel);
      supabase.removeChannel(profilesChannel);
    };
  }, [profile?.id, queryClient]);

  return (
    <div className="px-6 mb-12">
      <NetworkStatsHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <NetworkStatsGrid cardData={cardData} />
      </div>
    </div>
  );
};
