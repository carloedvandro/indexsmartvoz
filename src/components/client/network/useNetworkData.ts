
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
        // A função já está limitada para retornar apenas até o 4º nível
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
          
          // Adicionando logs para debug
          console.log("Criando estrutura de membros...");
          
          // Only include members that have valid profiles and are level 4 or below
          allNetworkMembers.forEach(member => {
            // Garantir que só processamos até o nível 4
            if (member.level > 4) {
              console.log(`Ignorando membro do nível ${member.level}: ID=${member.id}, user_id=${member.user_id}`);
              return;
            }
            
            const profileData = profilesMap.get(member.user_id);
            if (profileData) { // Only add member if profile data exists
              console.log(`Processando membro: ID=${member.id}, user_id=${member.user_id}, level=${member.level}, parent_id=${member.parent_id}`);
              
              membersMap.set(member.id, {
                id: member.id,
                user_id: member.user_id,
                level: member.level,
                parent_id: member.parent_id,
                user: {
                  id: member.user_id,
                  full_name: profileData.full_name || null,
                  email: profileData.email || '',
                  custom_id: profileData.custom_id || null,
                  status: profileData.status || 'pending',
                  registration_date: profileData.registration_date || null
                },
                children: []
              });
            } else {
              console.log(`Pulando membro (perfil não encontrado): ID=${member.id}, user_id=${member.user_id}`);
            }
          });

          // Build the tree structure
          const rootMembers: NetworkMember[] = [];
          
          console.log("Construindo árvore de rede...");
          
          membersMap.forEach((member, id) => {
            console.log(`Verificando onde posicionar membro: ID=${id}, parent_id=${member.parent_id}`);
            
            if (member.parent_id === userNetwork.id) {
              console.log(`Adicionando como membro raiz: ${member.user.full_name}`);
              rootMembers.push(member);
            } else if (membersMap.has(member.parent_id)) {
              const parent = membersMap.get(member.parent_id);
              if (!parent.children) parent.children = [];
              
              console.log(`Adicionando como filho de ${parent.user.full_name}: ${member.user.full_name}`);
              parent.children.push(member);
            } else {
              console.log(`ALERTA: Não encontrou pai para membro: ${member.user.full_name} (parent_id=${member.parent_id})`);
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
