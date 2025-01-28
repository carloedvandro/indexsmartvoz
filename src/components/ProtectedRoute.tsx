import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { LoadingState } from '@/components/client/dashboard/LoadingState';
import { supabase } from '@/integrations/supabase/client';

export const ProtectedRoute = () => {
  const { getSession, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();
        
        if (!session) {
          console.log("No session found, redirecting to login");
          const isAdminRoute = location.pathname.startsWith('/admin');
          const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
          
          // Clear any invalid session data
          await supabase.auth.signOut();
          
          navigate(loginPath, { replace: true });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        
        // If there's any auth error, sign out and redirect to login
        await supabase.auth.signOut();
        
        const isAdminRoute = location.pathname.startsWith('/admin');
        const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
        navigate(loginPath, { replace: true });
      }
    };

    checkAuth();
  }, [getSession, navigate, location.pathname]);

  if (isLoading) {
    return <LoadingState />;
  }

  return <Outlet />;
};