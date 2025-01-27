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
          toast.error("Error fetching network data");
          setLoading(false);
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
          toast.error("Error fetching network members");
          return;
        }

        console.log("Raw network members data:", allNetworkMembers);

        if (allNetworkMembers && allNetworkMembers.length > 0) {
          const profilePromises = allNetworkMembers.map(async member => {
            const { data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("full_name, email, custom_id, status")
              .eq("id", member.user_id)
              .maybeSingle();
              
            if (profileError) {
              console.error("Error fetching profile:", profileError);
              return {
                data: {
                  full_name: null,
                  email: "",
                  custom_id: null,
                  status: "pending"
                }
              };
            }
            
            return { data: profileData || {
              full_name: null,
              email: "",
              custom_id: null,
              status: "pending"
            }};
          });

          try {
            const profileResults = await Promise.all(profilePromises);
            console.log("Profile results:", profileResults);
            
            const membersMap = new Map();
            
            allNetworkMembers.forEach((member, index) => {
              const profileData = profileResults[index].data;
              membersMap.set(member.id, {
                id: member.id,
                level: 0,
                parentId: member.parent_id,
                user: {
                  full_name: profileData?.full_name || null,
                  email: profileData?.email || '',
                  custom_id: profileData?.custom_id || null,
                  status: profileData?.status || 'pending'
                },
                children: []
              });
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
            setNetworkData(finalRootMembers);
          } catch (error) {
            console.error("Error processing profile data:", error);
            toast.error("Error processing network data");
          }
        }
      } catch (error) {
        console.error("Error in fetchNetworkData:", error);
        toast.error("Error fetching network data");
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