
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNetworkData } from "./useNetworkData";
import { useFilteredNetwork } from "./useFilteredNetwork";
import { useIsMobile } from "@/hooks/use-mobile";
import { NetworkFilter } from "./NetworkFilter";
import { NetworkStyles } from "./components/NetworkStyles";
import { NetworkLoading } from "./components/NetworkLoading";
import { NetworkTreeContent } from "./components/NetworkTreeContent";
import { useNetworkRealtime } from "./hooks/useNetworkRealtime";
import { useNetworkDebug } from "./hooks/useNetworkDebug";

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { networkData, loading } = useNetworkData(userId);
  const isMobile = useIsMobile();
  
  // Use our custom hooks
  useNetworkRealtime(userId);
  
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
  
  console.log("Nível selecionado:", selectedLevel);
  console.log("Dados da rede originais:", networkData);
  console.log("Dados filtrados:", filteredData);
  console.log("Aplicando espaçamento vertical atualizado: 20px entre nós, 17px margem inferior");
  console.log("Movendo todos os nós 2px para a esquerda");

  // Debug node positions
  useNetworkDebug(filteredData, selectedLevel);

  // Load component for network CSS
  return (
    <div className="relative min-h-screen network-tree" data-selected-level={selectedLevel}>
      <NetworkStyles />
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 sticky top-20 z-20">
            <NetworkFilter
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
            />
          </div>

          <div className="md:col-span-3 relative">
            {loading ? (
              <NetworkLoading />
            ) : (
              <NetworkTreeContent 
                filteredData={filteredData}
                selectedLevel={selectedLevel}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
