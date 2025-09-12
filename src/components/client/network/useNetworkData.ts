
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NetworkMember } from './types';

interface UseNetworkDataResult {
  networkData: NetworkMember[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useNetworkData = (userId: string): UseNetworkDataResult => {
  const [networkData, setNetworkData] = useState<NetworkMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Buscar dados da rede do usuário
      const { data, error } = await supabase
        .from('network')
        .select(`
          id,
          user_id,
          parent_id,
          level,
          user:profiles!network_user_id_fkey (
            id,
            email,
            full_name,
            custom_id,
            graduation_type
          )
        `)
        .eq('parent_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Erro ao buscar dados da rede:", error);
        setError(`Erro ao buscar dados: ${error.message}`);
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados da rede.",
          variant: "destructive",
        });
      } else {
        // Transformar os dados para o formato esperado
        const transformedData: NetworkMember[] = (data || []).map(item => {
          // Acessar o primeiro elemento do array user, ou usar valores padrão
          const userProfile = Array.isArray(item.user) ? item.user[0] : item.user;
          
          return {
            id: item.id,
            user_id: item.user_id,
            parent_id: item.parent_id,
            level: item.level || 1,
            children: [],
            user: {
              id: userProfile?.id || '',
              email: userProfile?.email || '',
              full_name: userProfile?.full_name || null,
              custom_id: userProfile?.custom_id || null,
              graduation_type: userProfile?.graduation_type || null,
              status: 'active' as const
            }
          };
        });

        setNetworkData(transformedData);
      }
    } catch (err: any) {
      console.error("Erro inesperado ao buscar dados da rede:", err);
      setError(`Erro inesperado: ${err.message}`);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro ao processar os dados da rede.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const refreshData = () => {
    fetchData();
  };

  return { networkData, loading, error, refreshData };
};
