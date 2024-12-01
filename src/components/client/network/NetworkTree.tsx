import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { User2, ChevronDown, ChevronRight, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

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
            profiles!inner (
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
              full_name: member.profiles.full_name,
              email: member.profiles.email,
              custom_id: member.profiles.custom_id
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

  const NetworkNode = ({ member, depth = 0 }: { member: NetworkMember; depth?: number }) => {
    const isExpanded = expandedNodes.has(member.id);
    const hasChildren = member.children && member.children.length > 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{ marginLeft: `${depth * 24}px` }}
      >
        {depth > 0 && (
          <div className="absolute left-[-24px] top-1/2 w-6 h-px bg-gray-300" />
        )}
        <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            {hasChildren && (
              <button
                onClick={() => toggleNode(member.id)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
            )}
            <div className="bg-primary/10 p-2 rounded-full">
              <User2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{member.user.full_name || 'Usuário'}</p>
              <p className="text-sm text-gray-500">{member.user.email}</p>
              {member.user.custom_id && (
                <p className="text-xs text-gray-400">ID: {member.user.custom_id}</p>
              )}
              <p className="text-xs text-primary mt-1">Nível {member.level}</p>
            </div>
          </div>
        </Card>
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {member.children.map((child) => (
              <NetworkNode key={child.id} member={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Filtrar por nível:</span>
        </div>
        <Select
          value={selectedLevel}
          onValueChange={setSelectedLevel}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os níveis</SelectItem>
            <SelectItem value="1">Nível 1</SelectItem>
            <SelectItem value="2">Nível 2</SelectItem>
            <SelectItem value="3">Nível 3</SelectItem>
            <SelectItem value="4">Nível 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            <div className="space-y-4">
              {filteredData.map((member) => (
                <NetworkNode key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">Nenhum membro encontrado em sua rede.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};