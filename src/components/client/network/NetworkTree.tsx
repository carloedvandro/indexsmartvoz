
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
    const channel = supabase
      .channel('network-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'network'
        },
        (payload) => {
          console.log('Network data changed:', payload);
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
        (payload) => {
          console.log('Profiles data changed:', payload);
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
    console.log('Toggling node:', nodeId);
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
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col">
      <ParticlesBackground />
      <div className="relative z-0 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
          <div className="md:col-span-1">
            <NetworkFilter
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
            />
          </div>

          <div className="md:col-span-3 h-[calc(100vh-150px)] overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 w-full pr-8">
              <div className="pl-8">
                <AnimatePresence mode="wait">
                  {filteredData && filteredData.length > 0 ? (
                    <div className="space-y-2">
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
      </div>
    </div>
  );
};
