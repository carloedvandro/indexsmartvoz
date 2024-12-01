import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import { NetworkNode } from "./NetworkNode";
import { NetworkFilter } from "./NetworkFilter";

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
        console.log("Fetching network data for user:", userId);
        
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

        // Then, get all members connected to this network
        const { data: members, error: membersError } = await supabase
          .from("network")
          .select(`
            id,
            level,
            user_id,
            parent_id,
            profiles (
              full_name,
              email,
              custom_id
            )
          `)
          .eq("parent_id", userNetwork.id);

        if (membersError) {
          console.error("Error fetching network members:", membersError);
          return;
        }

        console.log("Network members found:", members);

        if (members) {
          const formattedMembers = members.map(member => ({
            id: member.id,
            level: member.level,
            user: {
              full_name: member.profiles?.full_name || null,
              email: member.profiles?.email || '',
              custom_id: member.profiles?.custom_id || null
            }
          }));
          setNetworkData(formattedMembers);
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

  const filteredData = selectedLevel === "all" 
    ? networkData 
    : networkData.filter(member => member.level === parseInt(selectedLevel));

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <NetworkFilter
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <div className="space-y-4">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            <div className="space-y-4">
              {filteredData.map((member) => (
                <NetworkNode
                  key={member.id}
                  member={member}
                  onToggle={toggleNode}
                  isExpanded={expandedNodes.has(member.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum membro encontrado em sua rede.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};