
import { useState, useEffect } from "react";
import { NetworkFilter } from "./NetworkFilter";
import { useNetworkData } from "./useNetworkData";
import { useFilteredNetwork } from "./useFilteredNetwork";
import { useIsMobile } from "@/hooks/use-mobile";
import { NetworkView } from "./components/NetworkView";
import { NetworkTreeLoading } from "./components/NetworkTreeLoading";
import { useNetworkSubscription } from "./hooks/useNetworkSubscription";
import { forceCssReload } from "./utils/cssLoader";
import { applyGesiaStyles, logNodePositions } from "./utils/gesiaStyleUpdater";
import { toast } from "sonner";
import { NetworkMember } from "./types";
import "@/styles/network.css";

interface NetworkTreeProps {
  userId: string;
  moveRafaelToGesia?: boolean;
}

export const NetworkTree = ({ userId, moveRafaelToGesia = false }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { networkData, loading } = useNetworkData(userId);
  const isMobile = useIsMobile();

  // Setup network subscription for real-time updates
  useNetworkSubscription(userId);

  // Adjusts the network data by moving Rafael to be a child of Gesia
  const adjustedNetworkData = React.useMemo(() => {
    if (!moveRafaelToGesia || !networkData || networkData.length === 0) {
      return networkData;
    }

    const modifiedData = JSON.parse(JSON.stringify(networkData)) as NetworkMember[];
    
    // Find Gesia in the network
    const findGesia = (members: NetworkMember[]): NetworkMember | null => {
      for (const member of members) {
        if (member.user.full_name === "Gesia Almeida Dos Santos") {
          return member;
        }
        
        if (member.children && member.children.length > 0) {
          const gesiaInChildren = findGesia(member.children);
          if (gesiaInChildren) {
            return gesiaInChildren;
          }
        }
      }
      return null;
    };
    
    // Find Rafael in the network
    const findRafael = (members: NetworkMember[], parent: NetworkMember | null = null): { rafael: NetworkMember | null, parent: NetworkMember | null } => {
      for (const member of members) {
        if (member.user.full_name && member.user.full_name.includes("Rafael")) {
          return { rafael: member, parent };
        }
        
        if (member.children && member.children.length > 0) {
          const result = findRafael(member.children, member);
          if (result.rafael) {
            return result;
          }
        }
      }
      return { rafael: null, parent: null };
    };
    
    // Move Rafael to be a child of Gesia
    const gesiaNode = findGesia(modifiedData);
    const { rafael, parent } = findRafael(modifiedData);
    
    if (gesiaNode && rafael && parent) {
      // Remove Rafael from his current parent
      parent.children = parent.children.filter(child => child.id !== rafael.id);
      
      // Add Rafael as a child of Gesia
      if (!gesiaNode.children) {
        gesiaNode.children = [];
      }
      
      rafael.parent_id = gesiaNode.id;
      gesiaNode.children.push(rafael);
      
      // Auto-expand Gesia's node
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        newSet.add(gesiaNode.id);
        return newSet;
      });
      
      console.log('Rafael moved to be a child of Gesia');
      toast.success('Rafael foi movido para ser filho da Gesia com sucesso!');
    } else {
      console.log('Failed to move Rafael: Could not find Gesia or Rafael in the network');
      if (!gesiaNode) toast.error('Não foi possível encontrar Gesia na rede');
      if (!rafael) toast.error('Não foi possível encontrar Rafael na rede');
    }
    
    return modifiedData;
  }, [networkData, moveRafaelToGesia]);

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

  // Auto-expand Gesia's node when data is loaded
  useEffect(() => {
    if (adjustedNetworkData) {
      const findAndExpandGesia = (members: NetworkMember[]) => {
        for (const member of members) {
          if (member.user.full_name === "Gesia Almeida Dos Santos") {
            setExpandedNodes(prev => {
              const newSet = new Set(prev);
              newSet.add(member.id);
              return newSet;
            });
            return true;
          }
          
          if (member.children && member.children.length > 0) {
            if (findAndExpandGesia(member.children)) {
              return true;
            }
          }
        }
        return false;
      };
      
      findAndExpandGesia(adjustedNetworkData);
    }
  }, [adjustedNetworkData]);

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

  const filteredData = useFilteredNetwork(adjustedNetworkData, selectedLevel);
  
  console.log("Nível selecionado:", selectedLevel);
  console.log("Dados da rede ajustados:", adjustedNetworkData);
  console.log("Dados filtrados:", filteredData);

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
}
