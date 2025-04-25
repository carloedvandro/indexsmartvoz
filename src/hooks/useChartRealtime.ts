
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useChartRealtime = (initialData: any[]) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Simula atualizações aleatórias a cada 3 segundos
    const interval = setInterval(() => {
      setData(currentData => {
        return currentData.map(item => ({
          ...item,
          value: item.value + (Math.random() * 100 - 50) // Variação aleatória entre -50 e 50
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
};
