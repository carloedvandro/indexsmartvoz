import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import { NetworkNode } from "./NetworkNode";
import { NetworkFilter } from "./NetworkFilter";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NetworkMember {
  id: string;
  level: number;
  user: {
    full_name: string | null;
    email: string;
    custom_id: string | null;
  };
  children?: NetworkMember[];
}

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [networkData, setNetworkData] = useState<NetworkMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const filterNetworkData = (data: NetworkMember[]): NetworkMember[] => {
    if (selectedLevel === "all") return data;
    
    return data.reduce<NetworkMember[]>((acc, member) => {
      if (member.level === parseInt(selectedLevel)) {
        acc.push(member);
      } else if (member.children) {
        const filteredChildren = filterNetworkData(member.children);
        if (filteredChildren.length > 0) {
          acc.push({
            ...member,
            children: filteredChildren
          });
        }
      }
      return acc;
    }, []);
  };

  const filteredData = filterNetworkData(networkData);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 md:p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-4 md:mb-6 px-3 md:px-6">
        <NetworkFilter
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
      </div>

      <ScrollArea className="flex-1 w-full px-3 md:px-6">
        <div className="min-w-[300px] pr-4">
          <AnimatePresence>
            {filteredData.length > 0 ? (
              <div className="space-y-4 pb-6">
                {filteredData.map((member) => (
                  <NetworkNode
                    key={member.id}
                    member={member}
                    onToggle={toggleNode}
                    expandedNodes={expandedNodes}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12">
                <p className="text-gray-500">Nenhum membro encontrado em sua rede.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
};
