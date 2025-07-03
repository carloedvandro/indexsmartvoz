
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useNetworkMembersStatus = () => {
  return useQuery({
    queryKey: ['network-members-status'],
    queryFn: async () => {
      console.log('🔍 Buscando status dos membros da rede...');
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('❌ Usuário não autenticado');
        throw new Error('Usuário não autenticado');
      }

      // Get all network members
      const { data: networkMembers, error: networkError } = await supabase
        .from('network')
        .select(`
          id,
          user_id,
          level,
          profiles!inner(
            id,
            full_name,
            email,
            status,
            created_at
          )
        `)
        .or(`user_id.eq.${user.id},parent_id.eq.${user.id}`);

      if (networkError) {
        console.error('❌ Erro ao buscar membros da rede:', networkError);
        throw networkError;
      }

      console.log('✅ Membros da rede encontrados:', networkMembers?.length || 0);

      const stats = {
        total: networkMembers?.length || 0,
        active: networkMembers?.filter(m => m.profiles?.status === 'active').length || 0,
        pending: networkMembers?.filter(m => m.profiles?.status === 'pending').length || 0,
        inactive: networkMembers?.filter(m => m.profiles?.status === 'inactive').length || 0,
      };

      return {
        members: networkMembers || [],
        stats
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
};
