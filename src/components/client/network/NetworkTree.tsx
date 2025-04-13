
import { useState, useEffect } from "react";
import { useNetworkData } from "./useNetworkData";
import { useFilteredNetwork } from "./useFilteredNetwork";
import { NetworkLevels } from "./NetworkLevels";
import { NetworkFilter } from "./NetworkFilter";
import { NetworkView } from "./components/NetworkView";
import { useNetworkSubscription } from "./hooks/useNetworkSubscription";
import { NetworkTreeLoading } from "./components/NetworkTreeLoading";
import { useNetworkMembersStatus } from "../dashboard/hooks/useNetworkMembersStatus";

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [filterTerm, setFilterTerm] = useState("");
  const { networkData, loading } = useNetworkData(userId);
  
  // Subscribe to real-time network changes
  useNetworkSubscription(userId);
  
  // Reset expanded nodes when level changes
  useEffect(() => {
    setExpandedNodes(new Set());
  }, [selectedLevel]);
  
  // Apply filtering based on selected level
  const filteredData = useFilteredNetwork(networkData, selectedLevel);
  
  // Apply additional text filtering
  const textFilteredData = filterTerm
    ? filteredData.filter(member => 
        member.user?.full_name?.toLowerCase().includes(filterTerm.toLowerCase()) ||
        member.user?.email?.toLowerCase().includes(filterTerm.toLowerCase()) ||
        member.user?.custom_id?.toLowerCase().includes(filterTerm.toLowerCase())
      )
    : filteredData;
  
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };
  
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

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full network-tree">
      <div className="w-full md:w-[260px] shrink-0">
        <div className="sticky top-24">
          <NetworkLevels
            selectedLevel={selectedLevel}
            onSelect={handleLevelChange}
          />
          <NetworkFilter
            filterTerm={filterTerm}
            setFilterTerm={setFilterTerm}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-x-hidden">
        {loading ? (
          <NetworkTreeLoading />
        ) : (
          <NetworkView
            filteredData={textFilteredData}
            selectedLevel={selectedLevel}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        )}
      </div>
    </div>
  );
};
