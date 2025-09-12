
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
      // Use profiles table temporarily since network table relationships aren't working yet
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          custom_id,
          created_at
        `)
        .limit(10);

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
          return {
            id: item.id,
            user_id: item.id,
            parent_id: null, // Temporary until network structure is set up
            level: 1, // Temporary default level
            children: [],
            user: {
              id: item.id,
              email: item.email || '',
              full_name: item.full_name || null,
              custom_id: item.custom_id || null,
              graduation_type: null, // This field doesn't exist yet
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
