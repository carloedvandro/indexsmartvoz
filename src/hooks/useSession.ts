
import React, { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

export const useSession = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getSession = useCallback(async (): Promise<Session | null> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('Error in getSession:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getSession, isLoading };
};
