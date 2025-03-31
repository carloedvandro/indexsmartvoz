
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

  // Ajustar posição do Marcio Bettanzos (filho da Gesia)
  useEffect(() => {
    // Função para aplicar margens personalizadas após o componente ser renderizado
    const applyCustomStyles = () => {
      if (!networkData || networkData.length === 0) return;
      
      // Procura por Gesia Almeida no networkData
      const findGesia = (nodes: any[]): any | null => {
        for (const node of nodes) {
          if (node.user && node.user.full_name === 'Gesia Almeida Dos Santos') {
            return node;
          }
          if (node.children && node.children.length > 0) {
            const found = findGesia(node.children);
            if (found) return found;
          }
        }
        return null;
      };
      
      const gesiaNode = findGesia(networkData);
      
      if (gesiaNode && gesiaNode.children && gesiaNode.children.length > 0) {
        // Para cada filho da Gesia, verifica se é o Marcio Bettanzos
        gesiaNode.children.forEach((child: any) => {
          if (child.user && child.user.full_name === 'Marcio Bettanzos da Silva') {
            // Encontra o elemento DOM para o Marcio e adiciona o estilo
            setTimeout(() => {
              const marcioElement = document.querySelector(`[data-member-name="Marcio Bettanzos da Silva"]`);
              if (marcioElement) {
                (marcioElement as HTMLElement).style.marginLeft = '10px'; // Atualizando para 10px
                console.log('Aplicado estilo personalizado para Marcio Bettanzos (10px)');
              }
            }, 500);
          }
        });
      }
    };
    
    applyCustomStyles();
  }, [networkData, selectedLevel]);

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
