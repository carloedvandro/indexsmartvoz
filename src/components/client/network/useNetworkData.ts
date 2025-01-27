import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NetworkMember } from "./types";
import { toast } from "sonner";

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
          .maybeSingle();

        if (userNetworkError) {
          console.error("Error fetching user network:", userNetworkError);
          toast.error("Erro ao buscar dados da rede");
          setLoading(false);
          return;
        }

        if (!userNetwork) {
          console.log("No network found for user");
          setLoading(false);
          return;
        }

        console.log("User network found:", userNetwork);

        // Buscar membros da rede usando a função get_all_network_members
        const { data: allNetworkMembers, error } = await supabase
          .rpc('get_all_network_members', {
            root_network_id: userNetwork.id
          });

        if (error) {
          console.error("Error fetching network members:", error);
          toast.error("Erro ao buscar membros da rede");
          return;
        }

        console.log("Raw network members data:", allNetworkMembers);

        if (allNetworkMembers && allNetworkMembers.length > 0) {
          const profilePromises = allNetworkMembers.map(member => 
            supabase
              .from("profiles")
              .select("full_name, email, custom_id, status, graduation_type, registration_date")
              .eq("id", member.user_id)
              .maybeSingle()
          );

          try {
            const profileResults = await Promise.all(profilePromises);
            console.log("Profile results:", profileResults);
            
            const membersMap = new Map();
            
            allNetworkMembers.forEach((member, index) => {
              const profileData = profileResults[index].data;
              if (profileData) {
                membersMap.set(member.id, {
                  id: member.id,
                  user_id: member.user_id,
                  parent_id: member.parent_id,
                  level: member.level,
                  children: [],
                  user: {
                    id: member.user_id,
                    full_name: profileData.full_name || "Usuário",
                    email: profileData.email || "",
                    custom_id: profileData.custom_id || null,
                    graduation_type: profileData.graduation_type || "0",
                    registration_date: profileData.registration_date || new Date().toISOString(),
                    status: profileData.status || "pending"
                  }
                });
              }
            });

            // Construir a árvore
            const finalRootMembers: NetworkMember[] = [];
            membersMap.forEach(member => {
              if (!member.parent_id || !membersMap.has(member.parent_id)) {
                finalRootMembers.push(member);
              } else {
                const parent = membersMap.get(member.parent_id);
                if (parent) {
                  if (!parent.children) parent.children = [];
                  parent.children.push(member);
                }
              }
            });

            console.log("Final network data:", finalRootMembers);
            setNetworkData(finalRootMembers);
          } catch (error) {
            console.error("Error processing profile data:", error);
            toast.error("Erro ao processar dados da rede");
          }
        }
      } catch (error) {
        console.error("Error in fetchNetworkData:", error);
        toast.error("Erro ao buscar dados da rede");
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