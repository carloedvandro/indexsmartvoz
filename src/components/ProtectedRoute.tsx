import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { LoadingState } from '@/components/client/dashboard/LoadingState';
import { supabase } from '@/integrations/supabase/client';

export const ProtectedRoute = () => {
  const { getSession, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [needsValidation, setNeedsValidation] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      
      if (!session) {
        const isAdminRoute = location.pathname.startsWith('/admin');
        const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
        navigate(loginPath, { replace: true });
        return;
      }

      // Verificar se o usuário precisa validar documentos/biometria
      const { data: profile } = await supabase
        .from('profiles')
        .select('facial_validation_status, document_validated')
        .eq('id', session.user.id)
        .single();

      if (profile && 
          (!profile.document_validated || 
           !profile.facial_validation_status || 
           profile.facial_validation_status === 'pending')) {
        // Redirecionar para a página de validação se não estiver na rota de validação
        if (!location.pathname.includes('validation-required')) {
          navigate('/client/validation-required', { replace: true });
        }
        setNeedsValidation(true);
        return;
      }

      setNeedsValidation(false);
    };

    checkAuth();
  }, [getSession, navigate, location]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (needsValidation && !location.pathname.includes('validation-required')) {
    return null;
  }

  return <Outlet />;
};