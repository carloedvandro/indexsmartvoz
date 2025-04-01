
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
    // Force reload network.css com um timestamp para evitar cache
    const timestamp = new Date().getTime();
    const linkId = 'network-css-dynamic';
    
    // Remove o link anterior se existir
    const existingLink = document.getElementById(linkId);
    if (existingLink) {
      existingLink.remove();
    }
    
    // Cria um novo link com timestamp
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `/src/styles/network.css?v=${timestamp}`;
    document.head.appendChild(link);
    
    console.log(`Forçando recarga de CSS com timestamp: ${timestamp}`);
    
    // Aplica estilos para Gesia após um tempo para garantir que o DOM esteja pronto
    setTimeout(() => {
      // Verificar se estamos no modo "Todos os Níveis"
      if (selectedLevel === "all") {
        const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
        console.log(`Encontrados ${gesiaNodes.length} nós da Gesia no modo "Todos os Níveis"`);
        
        gesiaNodes.forEach(node => {
          console.log('Forçando margem exata de 3.8px para Gesia');
          (node as HTMLElement).style.setProperty('margin-left', '3.8px', 'important');
          node.setAttribute('data-forced-style', 'true');
        });
      }
    }, 300);
    
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
  }, [userId, queryClient, selectedLevel]);

  // Este efeito é específico para quando o nível muda
  useEffect(() => {
    if (selectedLevel === "all") {
      setTimeout(() => {
        const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
        console.log(`Encontrados ${gesiaNodes.length} nós da Gesia após mudança para "Todos os Níveis"`);
        
        gesiaNodes.forEach(node => {
          console.log('Forçando margem exata de 3.8px para Gesia');
          (node as HTMLElement).style.setProperty('margin-left', '3.8px', 'important');
          node.setAttribute('data-forced-style', 'true');
        });
      }, 300);
    }
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

  // Este useEffect verifica as posições dos nós após renderização
  useEffect(() => {
    setTimeout(() => {
      const allNodes = document.querySelectorAll('[data-custom-id]');
      console.log(`Found ${allNodes.length} network nodes in DOM`);
      
      // Verificando as posições após as mudanças
      const allPositions = {};
      allNodes.forEach(node => {
        const customId = node.getAttribute('data-custom-id');
        const memberName = node.getAttribute('data-member-name');
        if (customId && memberName) {
          const styles = window.getComputedStyle(node);
          allPositions[customId] = {
            name: memberName,
            marginLeft: styles.marginLeft,
            marginTop: styles.marginTop
          };
          
          // Verificação especial para Gesia
          if (customId === 'Gesia89' || memberName === 'Gesia Almeida Dos Santos') {
            console.log(`Nó da Gesia: marginLeft=${styles.marginLeft}, marginTop=${styles.marginTop}`);
            
            // Se estamos no modo "Todos os Níveis" e a margem não é 3.8px, forçamos
            if (selectedLevel === "all" && styles.marginLeft !== '3.8px') {
              console.log('Corrigindo margem da Gesia para exatamente 3.8px');
              (node as HTMLElement).style.setProperty('margin-left', '3.8px', 'important');
            }
          }
        }
      });
      
      console.log('Posições atualizadas de todos os nós:', allPositions);
    }, 1000);
  }, [filteredData, selectedLevel]);

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
              onLevelChange={(level) => {
                setSelectedLevel(level);
                
                // Quando mudamos para "Todos os Níveis", precisamos garantir o estilo da Gesia
                if (level === "all") {
                  setTimeout(() => {
                    const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
                    console.log(`Encontrados ${gesiaNodes.length} nós da Gesia após mudança para "Todos os Níveis"`);
                    
                    gesiaNodes.forEach(node => {
                      console.log('Forçando margem exata de 3.8px para Gesia após mudança de nível');
                      (node as HTMLElement).style.setProperty('margin-left', '3.8px', 'important');
                    });
                  }, 300);
                }
              }}
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
