
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

      // Then, get all network members that have this network ID as parent
      const { data: directMembers, error: directError } = await supabase
        .from("network")
        .select()
        .eq("parent_id", userNetwork.id);

      if (directError) {
        console.error("Error fetching direct members:", directError);
        throw directError;
      }

      // These are direct referrals (level 1)
      stats.level1Count = directMembers?.length || 0;

      // If we have direct members, get their referrals (level 2)
      if (directMembers && directMembers.length > 0) {
        const directMemberIds = directMembers.map(member => member.id);
        const { data: level2Members, error: level2Error } = await supabase
          .from("network")
          .select()
          .in("parent_id", directMemberIds);

        if (level2Error) {
          console.error("Error fetching level 2 members:", level2Error);
          throw level2Error;
        }

        stats.level2Count = level2Members?.length || 0;

        // Get level 3 members (referrals of level 2 members)
        if (level2Members && level2Members.length > 0) {
          const level2MemberIds = level2Members.map(member => member.id);
          const { data: level3Members, error: level3Error } = await supabase
            .from("network")
            .select()
            .in("parent_id", level2MemberIds);

          if (level3Error) {
            console.error("Error fetching level 3 members:", level3Error);
            throw level3Error;
          }

          stats.level3Count = level3Members?.length || 0;

          // Get level 4 members (referrals of level 3 members)
          if (level3Members && level3Members.length > 0) {
            const level3MemberIds = level3Members.map(member => member.id);
            const { data: level4Members, error: level4Error } = await supabase
              .from("network")
              .select()
              .in("parent_id", level3MemberIds);

            if (level4Error) {
              console.error("Error fetching level 4 members:", level4Error);
              throw level4Error;
            }

            stats.level4Count = level4Members?.length || 0;
          }
        }
      }

      console.log("Calculated network stats:", stats);
      return stats;
    },
    enabled: !!userId
  });
};
