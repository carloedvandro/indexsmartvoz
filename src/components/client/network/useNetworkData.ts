import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NetworkMember } from "./types";

export const useNetworkData = (userId: string) => {
  const [networkData, setNetworkData] = useState<NetworkMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        console.log("Fetching network data for user ID:", userId);
        
        // First, get the network ID of the current user
        const { data: userNetwork, error: userNetworkError } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (userNetworkError) {
          console.error("Error fetching user network:", userNetworkError);
          return;
        }

        if (!userNetwork) {
          console.log("No network found for user");
          setLoading(false);
          return;
        }

        console.log("User network found:", userNetwork);

        // Get all members in the network tree
        const { data: allNetworkMembers, error: membersError } = await supabase
          .from("network")
          .select(`
            id,
            level,
            user_id,
            parent_id
          `);

        if (membersError) {
          console.error("Error fetching network members:", membersError);
          return;
        }

        console.log("All network members found:", allNetworkMembers);

        // If we have network members, fetch their profile information
        if (allNetworkMembers && allNetworkMembers.length > 0) {
          const profilePromises = allNetworkMembers.map(member => 
            supabase
              .from("profiles")
              .select("full_name, email, custom_id")
              .eq("id", member.user_id)
              .single()
          );

          const profileResults = await Promise.all(profilePromises);
          
          // Create a map of members by their IDs
          const membersMap = new Map();
          allNetworkMembers.forEach((member, index) => {
            const profileData = profileResults[index].data;
            membersMap.set(member.id, {
              id: member.id,
              level: member.level,
              parentId: member.parent_id,
              user: {
                full_name: profileData?.full_name || null,
                email: profileData?.email || '',
                custom_id: profileData?.custom_id || null
              },
              children: []
            });
          });

          // Build the tree structure
          const rootMembers: NetworkMember[] = [];
          membersMap.forEach(member => {
            if (member.parentId === userNetwork.id) {
              rootMembers.push(member);
            } else {
              const parent = membersMap.get(member.parentId);
              if (parent) {
                if (!parent.children) parent.children = [];
                parent.children.push(member);
              }
            }
          });

          console.log("Final network data:", rootMembers);
          setNetworkData(rootMembers);
        }
      } catch (error) {
        console.error("Error in fetchNetworkData:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNetworkData();
    }
  }, [userId]);

  return { networkData, loading };
};