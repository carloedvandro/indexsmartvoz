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
          
          const membersMap = new Map();
          
          // Primeiro, vamos criar todos os membros sem seus filhos
          allNetworkMembers.forEach((member, index) => {
            const profileData = profileResults[index].data;
            membersMap.set(member.id, {
              id: member.id,
              level: 0, // Será calculado depois
              parentId: member.parent_id,
              user: {
                full_name: profileData?.full_name || null,
                email: profileData?.email || '',
                custom_id: profileData?.custom_id || null
              },
              children: []
            });
          });

          // Função para calcular níveis
          const calculateLevels = (memberId: string, currentLevel: number): boolean => {
            const member = membersMap.get(memberId);
            if (!member || currentLevel > 4) return false;
            
            member.level = currentLevel;
            
            // Encontra e processa os filhos
            const childMembers = allNetworkMembers.filter(m => m.parent_id === memberId);
            childMembers.forEach(child => {
              if (currentLevel < 4) {
                calculateLevels(child.id, currentLevel + 1);
              }
            });

            return true;
          };

          // Calcula os níveis começando dos membros raiz
          const rootMembers = allNetworkMembers.filter(member => member.parent_id === userNetwork.id);
          rootMembers.forEach(rootMember => {
            calculateLevels(rootMember.id, 1);
          });

          // Remove membros com nível 0 ou maior que 4 do Map
          membersMap.forEach((member, id) => {
            if (member.level === 0 || member.level > 4) {
              membersMap.delete(id);
            }
          });

          // Constrói a árvore apenas com membros válidos
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
          setNetworkData(finalRootMembers);
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