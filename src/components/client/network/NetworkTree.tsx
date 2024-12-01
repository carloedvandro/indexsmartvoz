import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { NetworkNode } from "./NetworkNode";
import { NetworkFilter } from "./NetworkFilter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNetworkData } from "./useNetworkData";
import { useFilteredNetwork } from "./useFilteredNetwork";

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { networkData, loading } = useNetworkData(userId);

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

  const filteredData = useFilteredNetwork(networkData, selectedLevel);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <NetworkFilter
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
      </div>

      <ScrollArea className="flex-1 w-full pr-4 overflow-x-auto">
        <div className="min-w-[280px] space-y-2 pb-6">
          <AnimatePresence>
            {filteredData.length > 0 ? (
              filteredData.map((member) => (
                <NetworkNode
                  key={member.id}
                  member={member}
                  onToggle={toggleNode}
                  expandedNodes={expandedNodes}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">
                  Nenhum membro encontrado em sua rede.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
};