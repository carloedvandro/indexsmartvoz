
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
        id: '', // Will be filled below
        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
      };

      try {
        // Check if user exists
        const { data: userProfile, error: userError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", userId)
          .single();

        if (userError || !userProfile) {
          console.error("User profile not found:", userError);
          return stats;
        }

        // First, get the network ID for the current user
        const { data: userNetwork, error: userNetworkError } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        if (userNetworkError) {
          console.error("Error fetching user network:", userNetworkError);
          return stats;
        }

        if (!userNetwork) {
          console.log("No network found for user");
          return stats;
        }

        // Set the network ID
        stats.id = userNetwork.id;

        // Buscar todos os membros usando a função RPC
        const { data: allNetworkMembers, error: networkError } = await supabase
          .rpc('get_all_network_members', { root_network_id: userNetwork.id });

        if (networkError) {
          console.error("Error fetching network members:", networkError);
          return stats;
        }

        console.log("Raw network data for stats:", allNetworkMembers);

        if (!allNetworkMembers || !Array.isArray(allNetworkMembers)) {
          return stats;
        }
        
        // Get all user IDs to check which ones still exist
        const networkUserIds = allNetworkMembers.map(member => member.user_id);
        
        // Check which profiles actually exist
        const { data: existingProfiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id')
          .in('id', networkUserIds);

        if (profilesError) {
          console.error("Error fetching profiles for network stats:", profilesError);
          return stats;
        }

        // Create a set of existing user IDs for quick lookup
        const existingUserIds = new Set(existingProfiles?.map(profile => profile.id) || []);
        
        // Filter by levels and count only members who have existing profiles
        const validMembers = allNetworkMembers.filter(member => existingUserIds.has(member.user_id));
        
        // Group by level
        stats.level1Count = validMembers.filter(m => m.level === 1).length;
        stats.level2Count = validMembers.filter(m => m.level === 2).length;
        stats.level3Count = validMembers.filter(m => m.level === 3).length;
        stats.level4Count = validMembers.filter(m => m.level === 4).length;
        
        console.log("Final network stats:", stats);
      } catch (error) {
        console.error("Error calculating network stats:", error);
      }

      return stats;
    },
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds to keep updated
    staleTime: 10000 // Consider data stale after 10 seconds
  });
};
