import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NetworkData {
  total_users: number | null;
  active_users: number | null;
  inactive_users: number | null;
  total_revenue: number | null;
  new_users_today: number | null;
  active_users_today: number | null;
}

interface UseNetworkDataResult {
  networkData: NetworkData;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useNetworkData = (): UseNetworkDataResult => {
  const [networkData, setNetworkData] = useState<NetworkData>({
    total_users: null,
    active_users: null,
    inactive_users: null,
    total_revenue: null,
    new_users_today: null,
    active_users_today: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('network_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Erro ao buscar dados da rede:", error);
        setError(`Erro ao buscar dados: ${error.message}`);
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados da rede.",
          variant: "destructive",
        });
      } else {
        setNetworkData(data || {
          total_users: null,
          active_users: null,
          inactive_users: null,
          total_revenue: null,
          new_users_today: null,
          active_users_today: null,
        });
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
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return { networkData, loading, error, refreshData };
};
