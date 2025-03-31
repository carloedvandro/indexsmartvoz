
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { NetworkNode } from "./NetworkNode";
import { FilteredNetworkNode } from "./FilteredNetworkNode";
import { NetworkFilter } from "./NetworkFilter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNetworkData } from "./useNetworkData";
import { useFilteredNetwork } from "./useFilteredNetwork";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import "@/styles/network.css";

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { networkData, loading } = useNetworkData(userId);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Force reload network.css
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/styles/network.css?v=' + new Date().getTime();
    document.head.appendChild(link);
    
    const networkChannel = supabase
      .channel('network-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'network'
        },
        () => {
          console.log('Network data changed, invalidating query');
          queryClient.invalidateQueries({ queryKey: ['networkData', userId] });
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          console.log('Profiles data changed, invalidating query');
          queryClient.invalidateQueries({ queryKey: ['networkData', userId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(networkChannel);
      supabase.removeChannel(profilesChannel);
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [userId, queryClient]);

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

  useEffect(() => {
    setTimeout(() => {
      const allNodes = document.querySelectorAll('[data-custom-id]');
      console.log(`Found ${allNodes.length} network nodes in DOM`);
      
      const gesiaNode = document.querySelector('[data-custom-id="Gesia89"]');
      if (gesiaNode) {
        console.log('Gesia node found, computed style:', window.getComputedStyle(gesiaNode));
      } else {
        console.log('Gesia node not found in DOM by data-custom-id');
      }
      
      const gesiaByName = document.querySelector('[data-member-name="Gesia Almeida Dos Santos"]');
      if (gesiaByName) {
        console.log('Gesia node found by name, computed style:', window.getComputedStyle(gesiaByName));
      } else {
        console.log('Gesia node not found in DOM by data-member-name');
      }
      
      // Verifica a aplicação dos novos espaçamentos
      const spaceY6 = document.querySelector('.network-tree .space-y-6');
      if (spaceY6) {
        console.log('Espaçamento vertical aplicado:', window.getComputedStyle(spaceY6).marginBottom);
      }
    }, 1000);
  }, [filteredData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen network-tree">
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 sticky top-20 z-20">
            <NetworkFilter
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
            />
          </div>

          <div className="md:col-span-3 relative">
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
          </div>
        </div>
      </div>
    </div>
  );
}
