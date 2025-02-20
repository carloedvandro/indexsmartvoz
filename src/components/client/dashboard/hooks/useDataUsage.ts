
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DataPoint {
  date: string;
  usage: number;
}

interface UseDataUsageReturn {
  dataUsage: DataPoint[];
  isLoading: boolean;
  error: Error | null;
}

export const useDataUsage = (): UseDataUsageReturn => {
  const [dataUsage, setDataUsage] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDataUsage = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) return;

        const { data, error: fetchError } = await supabase
          .from('data_usage_history')
          .select('*')
          .eq('user_id', session.session.user.id)
          .order('date', { ascending: true });

        if (fetchError) throw fetchError;

        const formattedData = data?.map(item => ({
          date: new Date(item.date).toLocaleDateString(),
          usage: item.usage_mb / 1024 // Converter MB para GB
        })) || [];

        setDataUsage(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data usage'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataUsage();
  }, []);

  return { dataUsage, isLoading, error };
};
