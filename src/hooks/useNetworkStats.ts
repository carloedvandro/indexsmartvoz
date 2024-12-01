import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface NetworkStats {
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
        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
      };

      const { data: networkData, error } = await supabase
        .from("network")
        .select(`
          id,
          level,
          user_id,
          parent_id
        `)
        .eq("parent_id", userId);

      if (error) {
        console.error("Error fetching network stats:", error);
        throw error;
      }

      console.log("Network stats data received:", networkData);

      networkData?.forEach((member) => {
        switch (member.level) {
          case 1:
            stats.level1Count++;
            break;
          case 2:
            stats.level2Count++;
            break;
          case 3:
            stats.level3Count++;
            break;
          case 4:
            stats.level4Count++;
            break;
        }
      });

      console.log("Calculated network stats:", stats);
      return stats;
    },
    enabled: !!userId
  });
};