
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const useNetworkRealtime = (userId: string) => {
  const queryClient = useQueryClient();

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
};
