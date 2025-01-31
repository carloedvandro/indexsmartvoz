import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NetworkMember } from "./types";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export const useNetworkData = (userId: string) => {
  const { data: networkData = [], isLoading: loading } = useQuery({
    queryKey: ['networkData', userId],
    queryFn: async () => {
      try {
        // Add validation for userId
        if (!userId) {
          console.log("No user ID provided");
          return [];
        }

        console.log("Fetching network data for user ID:", userId);
        
        const { data: userNetwork, error: userNetworkError } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        if (userNetworkError) {
          console.error("Error fetching user network:", userNetworkError);
          toast.error("Error fetching network data");
          return [];
        }

        if (!userNetwork) {
          console.log("No network found for user");
          return [];
        }

        console.log("User network found:", userNetwork);

        const { data: allNetworkMembers, error } = await supabase
          .from("network")
          .select(`
            id,
            level,
            user_id,
            parent_id
          `);

        if (error) {
          console.error("Error fetching network members:", error);
          toast.error("Error fetching network members");
          return [];
        }

        console.log("Raw network members data:", allNetworkMembers);

        if (allNetworkMembers && allNetworkMembers.length > 0) {
          // Fetch all profiles in a single query
          const { data: profilesData, error: profilesError } = await supabase
            .from("profiles")
            .select("id, full_name, email, custom_id, status")
            .in('id', allNetworkMembers.map(member => member.user_id));

          if (profilesError) {
            console.error("Error fetching profiles:", profilesError);
            toast.error("Error fetching profiles");
            return [];
          }

          console.log("Profiles data:", profilesData);

          // Create a map of profiles for easy lookup
          const profilesMap = new Map(
            profilesData?.map(profile => [profile.id, profile]) || []
          );
            
          const membersMap = new Map();
          
          allNetworkMembers.forEach(member => {
            const profileData = profilesMap.get(member.user_id);
            if (profileData) { // Only add member if profile data exists
              membersMap.set(member.id, {
                id: member.id,
                level: 0,
                parentId: member.parent_id,
                user: {
                  full_name: profileData.full_name || null,
                  email: profileData.email || '',
                  custom_id: profileData.custom_id || null,
                  status: profileData.status || 'pending'
                },
                children: []
              });
            }
          });

          const calculateLevels = (memberId: string, currentLevel: number): boolean => {
            const member = membersMap.get(memberId);
            if (!member || currentLevel > 4) return false;
            
            member.level = currentLevel;
            
            const childMembers = allNetworkMembers.filter(m => m.parent_id === memberId);
            childMembers.forEach(child => {
              if (currentLevel < 4) {
                calculateLevels(child.id, currentLevel + 1);
              }
            });

            return true;
          };

          const rootMembers = allNetworkMembers.filter(member => member.parent_id === userNetwork.id);
          rootMembers.forEach(rootMember => {
            calculateLevels(rootMember.id, 1);
          });

          membersMap.forEach((member, id) => {
            if (member.level === 0 || member.level > 4) {
              membersMap.delete(id);
            }
          });

          const finalRootMembers: NetworkMember[] = [];
          membersMap.forEach(member => {
            if (member.parentId === userNetwork.id) {
              finalRootMembers.push(member);
            } else if (membersMap.has(member.parentId)) {
              const parent = membersMap.get(member.parentId);
              if (!parent.children) parent.children = [];
              parent.children.push(member);
            }
          });

          console.log("Final network data:", finalRootMembers);
          return finalRootMembers;
        }
        return [];
      } catch (error) {
        console.error("Error in fetchNetworkData:", error);
        toast.error("Error fetching network data");
        return [];
      }
    },
    enabled: !!userId, // Only run the query if userId exists
    refetchOnWindowFocus: false,
  });

  return { networkData, loading };
};