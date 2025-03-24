
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
        
        // First check if the user has a network entry
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

        // If user doesn't have a network entry, create one
        if (!userNetwork) {
          console.log("No network found for user, creating one");
          
          const { data: newNetwork, error: createError } = await supabase
            .from("network")
            .insert({
              user_id: userId,
              level: 1
            })
            .select("id");
            
          if (createError) {
            console.error("Error creating network entry:", createError);
            toast.error("Error creating network entry");
            return [];
          }
          
          if (!newNetwork || newNetwork.length === 0) {
            return [];
          }
          
          console.log("New network created:", newNetwork[0]);
        }

        // Get the network ID after ensuring it exists
        const { data: confirmedNetwork, error: confirmedNetworkError } = await supabase
          .from("network")
          .select("id")
          .eq("user_id", userId)
          .single();
          
        if (confirmedNetworkError || !confirmedNetwork) {
          console.error("Error fetching confirmed network:", confirmedNetworkError);
          toast.error("Error fetching network data");
          return [];
        }

        console.log("User network found:", confirmedNetwork);

        // Busca todos os membros da rede usando a função get_all_network_members
        const { data: allNetworkMembers, error } = await supabase
          .rpc('get_all_network_members', { root_network_id: confirmedNetwork.id });

        if (error) {
          console.error("Error fetching network members:", error);
          toast.error("Error fetching network members");
          return [];
        }

        console.log("Raw network members data:", allNetworkMembers);

        if (allNetworkMembers && allNetworkMembers.length > 0) {
          // Get all unique user_ids from network members
          const userIds = [...new Set(allNetworkMembers.map(member => member.user_id))];
          
          // Fetch all profiles in a single query
          const { data: profilesData, error: profilesError } = await supabase
            .from("profiles")
            .select("id, full_name, email, custom_id, status, registration_date")
            .in('id', userIds);

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
                level: member.level,
                parentId: member.parent_id,
                user: {
                  id: profileData.id,
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
            if (member.parentId === confirmedNetwork.id) {
              rootMembers.push(member);
            } else if (membersMap.has(member.parentId)) {
              const parent = membersMap.get(member.parentId);
              if (!parent.children) parent.children = [];
              parent.children.push(member);
            }
          });

          console.log("Final network data:", rootMembers);
          return rootMembers;
        }
        
        // Find sponsored users that might not be in the network yet
        const { data: sponsoredProfiles, error: sponsoredError } = await supabase
          .from("profiles")
          .select("id, full_name, email, custom_id, status, registration_date")
          .eq("sponsor_id", userId);
          
        if (sponsoredError) {
          console.error("Error fetching sponsored profiles:", sponsoredError);
          return [];
        }
        
        if (sponsoredProfiles && sponsoredProfiles.length > 0) {
          console.log("Found sponsored profiles that need network entries:", sponsoredProfiles);
          toast.info("Encontrados perfis patrocinados que precisam ser adicionados à rede");
          
          // Create network entries for sponsored profiles
          for (const profile of sponsoredProfiles) {
            const { data: existingNetwork, error: checkError } = await supabase
              .from("network")
              .select("id")
              .eq("user_id", profile.id)
              .maybeSingle();
              
            if (checkError) {
              console.error(`Error checking network for ${profile.full_name}:`, checkError);
              continue;
            }
            
            if (!existingNetwork) {
              const { error: createError } = await supabase
                .from("network")
                .insert({
                  user_id: profile.id,
                  parent_id: confirmedNetwork.id,
                  level: 2
                });
                
              if (createError) {
                console.error(`Error creating network for ${profile.full_name}:`, createError);
              } else {
                console.log(`Created network entry for ${profile.full_name}`);
              }
            }
          }
          
          // Refresh the data after creating network entries
          return await fetchNetworkData(confirmedNetwork.id);
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

// Helper function to fetch network data after creating entries
async function fetchNetworkData(networkId: string): Promise<NetworkMember[]> {
  try {
    const { data: allNetworkMembers, error } = await supabase
      .rpc('get_all_network_members', { root_network_id: networkId });

    if (error) {
      console.error("Error fetching network members:", error);
      return [];
    }

    if (!allNetworkMembers || allNetworkMembers.length === 0) {
      return [];
    }

    // Get all unique user_ids from network members
    const userIds = [...new Set(allNetworkMembers.map(member => member.user_id))];
    
    // Fetch all profiles in a single query
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, email, custom_id, status, registration_date")
      .in('id', userIds);

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      return [];
    }

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
          level: member.level,
          parentId: member.parent_id,
          user: {
            id: profileData.id,
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
      if (member.parentId === networkId) {
        rootMembers.push(member);
      } else if (membersMap.has(member.parentId)) {
        const parent = membersMap.get(member.parentId);
        if (!parent.children) parent.children = [];
        parent.children.push(member);
      }
    });

    return rootMembers;
  } catch (error) {
    console.error("Error in fetchNetworkData helper:", error);
    return [];
  }
}
