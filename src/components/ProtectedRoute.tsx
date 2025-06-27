
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { LoadingState } from '@/components/client/dashboard/LoadingState';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { getSession, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      
      if (!session) {
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

  return children ? <>{children}</> : <Outlet />;
};
