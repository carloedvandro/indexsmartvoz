
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

        // Busca todos os membros da rede usando a função get_all_network_members
        const { data: allNetworkMembers, error } = await supabase
          .rpc('get_all_network_members', { root_network_id: userNetwork.id });

        if (error) {
          console.error("Error fetching network members:", error);
          toast.error("Error fetching network members");
          return [];
        }

        console.log("Raw network members data:", allNetworkMembers);

        if (allNetworkMembers && allNetworkMembers.length > 0) {
          // Get all unique user_ids from network members
          const memberUserIds = allNetworkMembers.map(member => member.user_id);
          
          // Fetch only profiles that still exist in the system
          const { data: profilesData, error: profilesError } = await supabase
            .from("profiles")
            .select("id, full_name, email, custom_id, status, registration_date")
            .in('id', memberUserIds);

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
          
          // Only include members that have valid profiles
          allNetworkMembers.forEach(member => {
            const profileData = profilesMap.get(member.user_id);
            if (profileData) { // Only add member if profile data exists
              membersMap.set(member.id, {
                id: member.id,
                user_id: member.user_id, // Importante: Armazenar o user_id para verificações de duplicidade
                level: member.level,
                parent_id: member.parent_id,
                user: {
                  id: member.user_id, // Garantir que o ID do usuário esteja disponível
                  full_name: profileData.full_name || null,
                  email: profileData.email || '',
                  custom_id: profileData.custom_id || null,
                  status: profileData.status || 'pending',
                  registration_date: profileData.registration_date || null
                },
                children: []
              });
            }
          });

          // Build the tree structure
          const rootMembers: NetworkMember[] = [];
          membersMap.forEach((member, id) => {
            if (member.parent_id === userNetwork.id) {
              rootMembers.push(member);
            } else if (membersMap.has(member.parent_id)) {
              const parent = membersMap.get(member.parent_id);
              if (!parent.children) parent.children = [];
              parent.children.push(member);
            }
          });

          console.log("Final network data:", rootMembers);
          return rootMembers;
        }
        return [];
      } catch (error) {
        console.error("Error in fetchNetworkData:", error);
        toast.error("Error fetching network data");
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });

  return { networkData, loading };
};
