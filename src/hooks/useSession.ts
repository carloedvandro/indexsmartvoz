
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

export const useSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  const handleSessionError = useCallback(() => {
    setSession(null);
    // Clear any existing session
    supabase.auth.signOut();
    navigate('/client/login', { replace: true });
  }, [navigate]);

  const getSession = useCallback(async (): Promise<Session | null> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        handleSessionError();
        return null;
      }
      
      if (!session) {
        handleSessionError();
        return null;
      }

      // Verify the session is still valid
      const { data: user, error: refreshError } = await supabase.auth.getUser();
      
      if (refreshError || !user) {
        console.error('Error refreshing session:', refreshError);
        handleSessionError();
        return null;
      }

      setSession(session);
      return session;
    } catch (error) {
      console.error('Error in getSession:', error);
      handleSessionError();
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, handleSessionError]);

  useEffect(() => {
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'TOKEN_REFRESHED' && !session) {
        console.log('Token refresh failed');
        handleSessionError();
        return;
      }

      if (event === 'SIGNED_OUT') {
        handleSessionError();
        return;
      }

      if (session) {
        setSession(session);
      } else {
        handleSessionError();
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [getSession, handleSessionError]);

  return { getSession, isLoading, session };
};
