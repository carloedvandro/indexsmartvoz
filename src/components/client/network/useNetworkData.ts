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
          return;
        }

        console.log("Raw network members data:", allNetworkMembers);

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
          console.log("Profile results:", profileResults);
          
          // Create a map of members by their IDs
          const membersMap = new Map();
          
          // Primeiro, vamos criar todos os membros sem calcular os níveis
          allNetworkMembers.forEach((member, index) => {
            const profileData = profileResults[index].data;
            membersMap.set(member.id, {
              id: member.id,
              level: 1, // Inicialmente definimos todos como nível 1
              parentId: member.parent_id,
              user: {
                full_name: profileData?.full_name || null,
                email: profileData?.email || '',
                custom_id: profileData?.custom_id || null
              },
              children: []
            });
          });

          // Agora vamos calcular os níveis corretamente
          const calculateLevels = (memberId: string, currentLevel: number) => {
            const member = membersMap.get(memberId);
            if (!member) return;
            
            // Atualiza o nível do membro
            member.level = currentLevel;
            
            // Encontra todos os filhos diretos deste membro
            allNetworkMembers
              .filter(m => m.parent_id === memberId)
              .forEach(child => {
                // Limita o nível máximo a 4
                if (currentLevel < 4) {
                  calculateLevels(child.id, currentLevel + 1);
                }
              });
          };

          // Calcula os níveis começando dos membros raiz
          allNetworkMembers
            .filter(member => member.parent_id === userNetwork.id)
            .forEach(rootMember => {
              calculateLevels(rootMember.id, 1);
            });

          // Constrói a árvore
          const rootMembers: NetworkMember[] = [];
          membersMap.forEach(member => {
            if (member.parentId === userNetwork.id) {
              console.log(`Adding root member:`, member);
              rootMembers.push(member);
            } else {
              const parent = membersMap.get(member.parentId);
              if (parent) {
                if (!parent.children) parent.children = [];
                console.log(`Adding child member to parent ${parent.id}:`, member);
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