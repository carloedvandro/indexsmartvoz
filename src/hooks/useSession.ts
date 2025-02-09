
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

export const useSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  const getSession = useCallback(async (): Promise<Session | null> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        navigate('/client/login', { replace: true });
        return null;
      }
      
      if (!session) {
        navigate('/client/login', { replace: true });
        return null;
      }

      setSession(session);
      return session;
    } catch (error) {
      console.error('Error in getSession:', error);
      navigate('/client/login', { replace: true });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setSession(session);
      } else {
        setSession(null);
        navigate('/client/login', { replace: true });
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [getSession, navigate]);

  return { getSession, isLoading, session };
};
