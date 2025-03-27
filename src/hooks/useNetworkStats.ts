
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

      // First, get the network ID for the current user
      const { data: userNetwork, error: userNetworkError } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

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

      // Then, get all network members that have this network ID as parent
      const { data: networkData, error } = await supabase
        .from("network")
        .select(`
          id,
          level,
          user_id,
          parent_id
        `)
        .eq("parent_id", userNetwork.id);

      if (error) {
        console.error("Error fetching network stats:", error);
        throw error;
      }

      console.log("Network stats data received:", networkData);

      // Count members based on their actual level in relation to the current user
      networkData?.forEach((member) => {
        // Adjust the level count based on the direct relationship
        // Since these are direct children of the current user's network,
        // they are all level 1 (direct indicators)
        stats.level1Count++;
      });

      // Now get second level members (members whose parent is one of our direct members)
      if (networkData && networkData.length > 0) {
        const directMemberIds = networkData.map(member => member.id);
        const { data: level2Data, error: level2Error } = await supabase
          .from("network")
          .select()
          .in("parent_id", directMemberIds);

        if (level2Error) {
          console.error("Error fetching level 2 stats:", level2Error);
          throw level2Error;
        }

        if (level2Data) {
          stats.level2Count = level2Data.length;

          // Get third level members
          const level2MemberIds = level2Data.map(member => member.id);
          const { data: level3Data, error: level3Error } = await supabase
            .from("network")
            .select()
            .in("parent_id", level2MemberIds);

          if (level3Error) {
            console.error("Error fetching level 3 stats:", level3Error);
            throw level3Error;
          }

          if (level3Data) {
            stats.level3Count = level3Data.length;

            // Get fourth level members
            const level3MemberIds = level3Data.map(member => member.id);
            const { data: level4Data, error: level4Error } = await supabase
              .from("network")
              .select()
              .in("parent_id", level3MemberIds);

            if (level4Error) {
              console.error("Error fetching level 4 stats:", level4Error);
              throw level4Error;
            }

            if (level4Data) {
              stats.level4Count = level4Data.length;
            }
          }
        }
      }

      console.log("Calculated network stats:", stats);
      return stats;
    },
    enabled: !!userId
  });
};
