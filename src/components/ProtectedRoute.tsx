import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import { LoadingState } from '@/components/client/dashboard/LoadingState';
import { BiometricValidation } from '@/components/client/biometrics/BiometricValidation';
import { supabase } from '@/integrations/supabase/client';

export const ProtectedRoute = () => {
  const { getSession, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [needsBiometricValidation, setNeedsBiometricValidation] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();
        
        if (!session) {
          const isAdminRoute = location.pathname.startsWith('/admin');
          const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
          navigate(loginPath, { replace: true });
          return;
        }

        // Verificar status da validação biométrica
        const { data: profile } = await supabase
          .from('profiles')
          .select('facial_validation_status, document_validated')
          .eq('id', session.user.id)
          .single();

        const needsValidation = !profile?.document_validated || 
          !profile?.facial_validation_status || 
          profile.facial_validation_status === 'pending';

        setNeedsBiometricValidation(needsValidation);

        // Se precisar de validação e não estiver na tela de login/registro
        if (needsValidation && 
            !location.pathname.includes('/login') && 
            !location.pathname.includes('/register')) {
          // Redirecionar para uma página de validação pendente
          navigate('/client/validation-required', { replace: true });
        }

        setIsValidating(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsValidating(false);
      }
    };

    checkAuth();
  }, [getSession, navigate, location]);

  if (isLoading || isValidating) {
    return <LoadingState />;
  }

  // Se precisar de validação biométrica, mostrar o modal
  if (needsBiometricValidation) {
    return <BiometricValidation />;
  }

  return <Outlet />;
};