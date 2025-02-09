
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

      console.log("Raw network members data:", networkMembers);

      // Get profiles for all network members to check their status
      const memberUserIds = networkMembers?.map(member => member.user_id) || [];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, status')
        .in('id', memberUserIds);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }

      // Create a map of user IDs to their status
      const userStatuses = new Map(
        profiles?.map(profile => [profile.id, profile.status]) || []
      );

      // Use Map to store unique members by their user_id for each level
      const uniqueMembersByLevel = new Map<number, Set<string>>();
      
      // Initialize Sets for each level
      for (let i = 1; i <= 4; i++) {
        uniqueMembersByLevel.set(i, new Set<string>());
      }

      // Process each member and add to appropriate level Set
      if (networkMembers) {
        networkMembers.forEach(member => {
          // Only count members:
          // 1. From levels 1-4
          // 2. Excluding the current user
          // 3. With status 'active' or 'ativo'
          const memberStatus = userStatuses.get(member.user_id)?.toLowerCase();
          const isActive = memberStatus === 'active' || memberStatus === 'ativo';
          
          if (member.level >= 1 && 
              member.level <= 4 && 
              member.user_id !== userId &&
              isActive) {
            const memberSet = uniqueMembersByLevel.get(member.level);
            if (memberSet) {
              memberSet.add(member.user_id);
            }
          }
        });
      }

      // Set the counts from unique members at each level
      stats.level1Count = uniqueMembersByLevel.get(1)?.size || 0;
      stats.level2Count = uniqueMembersByLevel.get(2)?.size || 0;
      stats.level3Count = uniqueMembersByLevel.get(3)?.size || 0;
      stats.level4Count = uniqueMembersByLevel.get(4)?.size || 0;

      console.log("Calculated network stats:", {
        ...stats,
        totalMembers: stats.level1Count + stats.level2Count + stats.level3Count + stats.level4Count,
        level1Members: Array.from(uniqueMembersByLevel.get(1) || [])
      });

      return stats;
    },
    enabled: !!userId
  });
};
