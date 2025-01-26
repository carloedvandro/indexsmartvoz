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
        // Determine which login page to redirect to based on the current path
        const isAdminRoute = location.pathname.startsWith('/admin');
        const loginPath = isAdminRoute ? '/admin/login' : '/client/login';
        navigate(loginPath, { replace: true });
        return;
      }

      // Check if user needs biometric validation
      const { data: profile } = await supabase
        .from('profiles')
        .select('facial_validation_status')
        .eq('id', session.user.id)
        .single();

      if (profile && (!profile.facial_validation_status || profile.facial_validation_status === 'pending')) {
        setNeedsBiometricValidation(true);
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