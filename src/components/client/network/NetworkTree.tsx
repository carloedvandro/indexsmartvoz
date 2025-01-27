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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1">
        <NetworkFilter
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
      </div>

      <div className="md:col-span-3">
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="pr-4">
            <AnimatePresence>
              {filteredData.length > 0 ? (
                <div className="space-y-2">
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
    </div>
  );
};