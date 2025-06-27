
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUserRole, UserRole } from '@/hooks/useUserRole';
import { LoadingState } from '@/components/client/dashboard/LoadingState';

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

export const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const { role, loading, error } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || error) return;

    if (!role) {
      // Usuário não autenticado
      const isAdminRoute = location.pathname.startsWith('/admin');
      const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
      navigate(loginPath, { replace: true });
      return;
    }

    if (!allowedRoles.includes(role)) {
      // Usuário não tem permissão para acessar esta rota
      const redirectPath = role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [role, loading, error, allowedRoles, navigate, location.pathname]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro de Autenticação</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    return <LoadingState />;
  }

  return children ? <>{children}</> : <Outlet />;
};
