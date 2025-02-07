
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface NetworkStats {
  id: string;
  level1Count: number;
  level2Count: number;
  level3Count: number;
  level4Count: number;
}

export const useNetworkStats = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['networkStats', userId],
    queryFn: async () => {
      if (!userId) {
        console.log("No user ID provided for network stats");
        return null;
      }

      console.log("Fetching network stats for user ID:", userId);

      const stats: NetworkStats = {
        id: '', // Will be set below
        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
      };

      // First, get the network ID for the current user
      const { data: userNetwork, error: userNetworkError } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (userNetworkError) {
        console.error("Error fetching user network:", userNetworkError);
        throw userNetworkError;
      }

      if (!userNetwork) {
        console.log("No network found for user");
        return stats;
      }

      // Set the network ID
      stats.id = userNetwork.id;

      // Use RPC to get all network members
      const { data: networkMembers, error: networkError } = await supabase
        .rpc('get_all_network_members', {
          root_network_id: userNetwork.id
        });

      if (networkError) {
        console.error("Error fetching network members:", networkError);
        throw networkError;
      }

      // Create Sets to store unique member IDs for each level
      const uniqueMembersByLevel = new Map<number, Set<string>>();
      
      // Initialize Sets for each level
      for (let i = 1; i <= 4; i++) {
        uniqueMembersByLevel.set(i, new Set<string>());
      }

      // Process each member and add to appropriate level Set
      networkMembers?.forEach(member => {
        if (member.level >= 1 && member.level <= 4) {
          uniqueMembersByLevel.get(member.level)?.add(member.user_id);
        }
      });

      // Set the counts from unique members at each level
      stats.level1Count = uniqueMembersByLevel.get(1)?.size || 0;
      stats.level2Count = uniqueMembersByLevel.get(2)?.size || 0;
      stats.level3Count = uniqueMembersByLevel.get(3)?.size || 0;
      stats.level4Count = uniqueMembersByLevel.get(4)?.size || 0;

      console.log("Calculated network stats:", stats);
      return stats;
    },
    enabled: !!userId
  });
};
