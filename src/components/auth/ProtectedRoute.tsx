import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { LoadingState } from '@/components/client/dashboard/LoadingState';

interface ProtectedRouteProps {
  role?: 'admin' | 'client';
}

export const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { getSession, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      
      if (!session) {
        const loginPath = role === 'admin' ? '/admin/login' : '/login';
        navigate(loginPath, { replace: true });
        return;
      }
    };

    checkAuth();
  }, [getSession, navigate, role]);

  if (isLoading) {
    return <LoadingState />;
  }

  return <Outlet />;
};