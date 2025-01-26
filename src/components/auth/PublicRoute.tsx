import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { LoadingState } from '@/components/client/dashboard/LoadingState';

export const PublicRoute = () => {
  const { getSession, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        navigate('/client/dashboard', { replace: true });
      }
    };

    checkAuth();
  }, [getSession, navigate]);

  if (isLoading) {
    return <LoadingState />;
  }

  return <Outlet />;
};