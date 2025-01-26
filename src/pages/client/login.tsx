import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ClientLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if we're on a password recovery route
    const isPasswordRecovery = window.location.hash.includes('#access_token') && 
                              window.location.hash.includes('type=recovery');

    if (isPasswordRecovery) {
      navigate('/client/reset-password' + window.location.hash);
      return;
    }

    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/client/dashboard');
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session) {
        navigate('/client/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[500px] relative z-10 mx-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Smartvoz
          </h1>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                backgroundColor: '#6B21A8',
                color: 'white',
                borderRadius: '9999px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: '500',
                width: '100%',
                marginTop: '1rem',
              },
              anchor: {
                color: '#6B21A8',
                textDecoration: 'none',
                fontSize: '0.875rem',
              },
              input: {
                borderRadius: '0.75rem',
                border: '1px solid #E5E7EB',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                width: '100%',
                backgroundColor: 'white',
                color: '#1F2937',
              },
              message: {
                color: '#6B21A8',
                marginTop: '0.5rem',
                fontSize: '0.875rem',
              },
              label: {
                color: '#1F2937',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
              },
            },
            className: {
              container: 'space-y-4',
              button: 'hover:bg-purple-700 transition-colors',
              input: 'focus:border-purple-500 focus:ring-purple-500',
              label: 'block text-sm font-medium',
              message: 'text-sm',
              anchor: 'text-black [&>span:last-child]:font-bold',
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: t('sign_in.email_label'),
                password_label: t('sign_in.password_label'),
                button_label: t('sign_in.button_label'),
                loading_button_label: t('sign_in.loading_button_label'),
                password_input_placeholder: t('sign_in.password_input_placeholder'),
                email_input_placeholder: t('sign_in.email_input_placeholder'),
              }
            }
          }}
          theme="default"
          providers={[]}
          redirectTo={`${window.location.origin}/client/dashboard`}
          onlyThirdPartyProviders={false}
          magicLink={false}
          showLinks={true}
          view="sign_in"
        />
      </div>
    </div>
  );
}