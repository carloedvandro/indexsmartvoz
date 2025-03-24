
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
import { ParticlesBackground } from "../products/ParticlesBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface NetworkTreeProps {
  userId: string;
}

export const NetworkTree = ({ userId }: NetworkTreeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { networkData, loading } = useNetworkData(userId);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  // Set up real-time subscriptions for network and profile changes
  useEffect(() => {
    const channel = supabase
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
      supabase.removeChannel(channel);
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

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['networkData', userId] });
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
    <div className="relative min-h-screen pb-20 bg-white">
      <ParticlesBackground />
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 sticky top-20 z-20">
            <div className="space-y-4">
              <NetworkFilter
                selectedLevel={selectedLevel}
                onLevelChange={setSelectedLevel}
              />
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar Rede
              </Button>
            </div>
          </div>

          <div className="md:col-span-3 relative">
            <div className="h-[calc(100vh-120px)] overflow-y-auto">
              <div className="pr-4 pb-20">
                <AnimatePresence>
                  {filteredData.length > 0 ? (
                    <div className="space-y-4">
                      {filteredData.map((member) => (
                        selectedLevel === "all" ? (
                          <NetworkNode
                            key={member.id}
                            member={member}
                            onToggle={toggleNode}
                            expandedNodes={expandedNodes}
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
                    <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                      <p className="text-gray-500 mb-4">
                        Nenhum membro encontrado em sua rede.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleRefresh}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Atualizar dados
                      </Button>
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
