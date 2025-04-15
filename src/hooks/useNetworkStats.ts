
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

      // Filter out members whose profiles don't exist (deleted users)
      if (networkData && networkData.length > 0) {
        // Get all user IDs from network data to check which ones still exist in profiles
        const networkUserIds = networkData.map(member => member.user_id);
        
        // Check which profiles actually exist (to filter out deleted users)
        const { data: existingProfiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id')
          .in('id', networkUserIds);

        if (profilesError) {
          console.error("Error fetching profiles for network stats:", profilesError);
          throw profilesError;
        }

        // Create a set of existing user IDs for quick lookup
        const existingUserIds = new Set(existingProfiles?.map(profile => profile.id) || []);
        
        // Filter network data to only include members with existing profiles
        const validNetworkData = networkData.filter(member => existingUserIds.has(member.user_id));
        
        console.log("Valid network members after filtering:", validNetworkData.length);
        
        // Count level 1 members (direct referrals)
        stats.level1Count = validNetworkData.length;

        // Now get second level members (members whose parent is one of our direct members)
        if (validNetworkData.length > 0) {
          const directMemberIds = validNetworkData.map(member => member.id);
          const { data: level2Data, error: level2Error } = await supabase
            .from("network")
            .select()
            .in("parent_id", directMemberIds);

          if (level2Error) {
            console.error("Error fetching level 2 stats:", level2Error);
            throw level2Error;
          }

          if (level2Data && level2Data.length > 0) {
            // Filter out level 2 members whose profiles don't exist
            const level2UserIds = level2Data.map(member => member.user_id);
            const { data: level2Profiles } = await supabase
              .from('profiles')
              .select('id')
              .in('id', level2UserIds);
            
            const validLevel2UserIds = new Set(level2Profiles?.map(profile => profile.id) || []);
            const validLevel2Data = level2Data.filter(member => validLevel2UserIds.has(member.user_id));
            
            stats.level2Count = validLevel2Data.length;

            // Get third level members
            if (validLevel2Data.length > 0) {
              const level2MemberIds = validLevel2Data.map(member => member.id);
              const { data: level3Data, error: level3Error } = await supabase
                .from("network")
                .select()
                .in("parent_id", level2MemberIds);

              if (level3Error) {
                console.error("Error fetching level 3 stats:", level3Error);
                throw level3Error;
              }

              if (level3Data && level3Data.length > 0) {
                // Filter out level 3 members whose profiles don't exist
                const level3UserIds = level3Data.map(member => member.user_id);
                const { data: level3Profiles } = await supabase
                  .from('profiles')
                  .select('id')
                  .in('id', level3UserIds);
                
                const validLevel3UserIds = new Set(level3Profiles?.map(profile => profile.id) || []);
                const validLevel3Data = level3Data.filter(member => validLevel3UserIds.has(member.user_id));
                
                stats.level3Count = validLevel3Data.length;

                // Get fourth level members
                if (validLevel3Data.length > 0) {
                  const level3MemberIds = validLevel3Data.map(member => member.id);
                  const { data: level4Data, error: level4Error } = await supabase
                    .from("network")
                    .select()
                    .in("parent_id", level3MemberIds);

                  if (level4Error) {
                    console.error("Error fetching level 4 stats:", level4Error);
                    throw level4Error;
                  }

                  if (level4Data && level4Data.length > 0) {
                    // Filter out level 4 members whose profiles don't exist
                    const level4UserIds = level4Data.map(member => member.user_id);
                    const { data: level4Profiles } = await supabase
                      .from('profiles')
                      .select('id')
                      .in('id', level4UserIds);
                    
                    const validLevel4UserIds = new Set(level4Profiles?.map(profile => profile.id) || []);
                    const validLevel4Data = level4Data.filter(member => validLevel4UserIds.has(member.user_id));
                    
                    stats.level4Count = validLevel4Data.length;
                  }
                }
              }
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
