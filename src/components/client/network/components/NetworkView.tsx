
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { NetworkNode } from "../NetworkNode";
import { FilteredNetworkNode } from "../FilteredNetworkNode";
import { NetworkMember } from "../types";

interface NetworkViewProps {
  filteredData: NetworkMember[];
  selectedLevel: string;
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
}

export const NetworkView = ({ 
  filteredData, 
  selectedLevel, 
  expandedNodes, 
  toggleNode 
}: NetworkViewProps) => {
  return (
    <div className="h-auto max-h-[calc(100vh-140px)] overflow-y-auto pb-60">
      <div className="pr-4">
        <AnimatePresence>
          {filteredData.length > 0 ? (
            <div className="space-y-6 mb-32">
              {filteredData.map((member) => (
                selectedLevel === "all" ? (
                  <NetworkNode
                    key={member.id}
                    member={member}
                    onToggle={toggleNode}
                    expandedNodes={expandedNodes}
                    isAllLevels={selectedLevel === "all"}
                  />
                ) : (
                  <FilteredNetworkNode
                    key={member.id}
                    member={member}
                    onToggle={toggleNode}
                    expandedNodes={expandedNodes}
                  />
                )
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
    </div>
  );
};
