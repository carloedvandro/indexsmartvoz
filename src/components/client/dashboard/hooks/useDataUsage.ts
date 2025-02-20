
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

        // Mock data for now since we don't have the actual table
        const mockData: DataPoint[] = [
          { date: '2024-02-01', usage: 1.5 },
          { date: '2024-02-02', usage: 2.1 },
          { date: '2024-02-03', usage: 1.8 },
          { date: '2024-02-04', usage: 2.3 },
          { date: '2024-02-05', usage: 1.9 }
        ];
        
        setDataUsage(mockData);
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
