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

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      
      if (!session) {
        const isAdminRoute = location.pathname.startsWith('/admin');
        const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
        navigate(loginPath, { replace: true });
        return;
      }

      // Verificar se o usuário precisa de validação biométrica
      const { data: profile } = await supabase
        .from('profiles')
        .select('facial_validation_status, document_validated')
        .eq('id', session.user.id)
        .single();

      console.log('Profile validation status:', profile);

      // Mostrar validação biométrica apenas se:
      // 1. O documento não foi validado OU
      // 2. A validação facial está pendente/não feita
      // E não estiver em rotas admin
      const needsValidation = profile && 
        (!profile.document_validated || 
         !profile.facial_validation_status || 
         profile.facial_validation_status === 'pending');

      const isAdminRoute = location.pathname.startsWith('/admin');

      if (needsValidation && !isAdminRoute) {
        console.log('User needs biometric validation');
        setNeedsBiometricValidation(true);
        // Redirecionar para login se precisar de validação
        navigate('/client/login', { replace: true });
      } else {
        console.log('User does not need biometric validation');
        setNeedsBiometricValidation(false);
      }
    };

    checkAuth();
  }, [getSession, navigate, location]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <Outlet />
      {needsBiometricValidation && <BiometricValidation />}
    </>
  );
};