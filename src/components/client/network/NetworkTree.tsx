
import React, { useState, useEffect } from "react";
import { NetworkFilter } from "./NetworkFilter";
import { useNetworkData } from "./useNetworkData";
import { useFilteredNetwork } from "./useFilteredNetwork";
import { useIsMobile } from "@/hooks/use-mobile";
import { NetworkView } from "./components/NetworkView";
import { NetworkTreeLoading } from "./components/NetworkTreeLoading";
import { useNetworkSubscription } from "./hooks/useNetworkSubscription";
import { forceCssReload } from "./utils/cssLoader";
import { applyGesiaStyles, logNodePositions } from "./utils/gesiaStyleUpdater";
import "@/styles/network.css";

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { networkData, loading } = useNetworkData(userId);
  const isMobile = useIsMobile();

  // Setup network subscription for real-time updates
  useNetworkSubscription(userId);

  // Corrija os nomes incorretos nos dados da rede
  useEffect(() => {
    if (networkData && networkData.length > 0) {
      // Correção profunda para os nomes incorretos
      const correctNames = (members: NetworkMember[]) => {
        members.forEach(member => {
          // Corrigir Gesia
          if (member.user.custom_id === 'Gesia89' && member.user.full_name !== 'Gesia Almeida Dos Santos') {
            member.user.full_name = 'Gesia Almeida Dos Santos';
          }
          
          // Corrigir recursivamente para filhos
          if (member.children && member.children.length > 0) {
            correctNames(member.children);
          }
        });
      };
      
      correctNames(networkData);
    }
  }, [networkData]);

  // Main CSS and style effect
  useEffect(() => {
    // Force reload CSS with timestamp
    const cleanup = forceCssReload();
    
    // Apply styles for Gesia
    applyGesiaStyles(selectedLevel);
    
    // Log node positions for debugging
    logNodePositions();
    
    return cleanup;
  }, [userId, selectedLevel]);

  // This effect is specific to level changes
  useEffect(() => {
    // Add appropriate class based on selected level
    const networkTree = document.querySelector('.network-tree');
    if (networkTree) {
      if (selectedLevel === "all") {
        networkTree.classList.add('view-all-levels');
        networkTree.classList.remove('view-individual-level');
      } else {
        networkTree.classList.remove('view-all-levels');
        networkTree.classList.add('view-individual-level');
      }
    }
    
    // Apply updated styles for Gesia and "Pendente" text
    applyGesiaStyles(selectedLevel);
    
    // Apply additional class to force style refresh when changing levels
    document.body.classList.add('force-refresh-styles');
    setTimeout(() => {
      document.body.classList.remove('force-refresh-styles');
    }, 100);
    
  }, [selectedLevel]);

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

  if (loading) {
    return <NetworkTreeLoading />;
  }

  return (
    <div className={`relative min-h-screen network-tree ${selectedLevel === 'all' ? 'view-all-levels' : 'view-individual-level'}`}>
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 sticky top-20 z-20">
            <NetworkFilter
              selectedLevel={selectedLevel}
              onLevelChange={(level) => {
                setSelectedLevel(level);
                
                // When changing to "Todos os Níveis", ensure Gesia's style
                if (level === "all") {
                  applyGesiaStyles("all");
                } else {
                  applyGesiaStyles(level);
                }
              }}
            />
          </div>

          <div className="md:col-span-3 relative">
            <NetworkView 
              filteredData={filteredData}
              selectedLevel={selectedLevel}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
