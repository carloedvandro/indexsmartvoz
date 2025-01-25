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
      } else if (event === 'SIGNED_OUT') {
        navigate('/client/login');
      } else if (event === 'PASSWORD_RECOVERY') {
        navigate('/client/reset-password');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Smartvoz
          </h1>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                background: '#4F46E5',
                color: 'white',
                borderRadius: '0.375rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                width: '100%',
              },
              anchor: {
                color: '#4F46E5',
                textDecoration: 'none',
                fontSize: '0.875rem',
              },
              input: {
                borderRadius: '0.375rem',
                border: '1px solid #E5E7EB',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                width: '100%',
                marginBottom: '1rem',
              },
              message: {
                color: '#EF4444',
                marginTop: '0.5rem',
                fontSize: '0.875rem',
              },
              label: {
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
              },
            },
            className: {
              container: 'space-y-4',
              button: 'hover:bg-indigo-600 transition-colors',
              input: 'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              label: 'block text-sm font-medium text-gray-700',
              message: 'text-sm mt-1',
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                password_label: "Senha",
                button_label: "Entrar",
                loading_button_label: "Entrando...",
                password_input_placeholder: "Sua senha",
                email_input_placeholder: "Seu email",
              },
              sign_up: {
                email_label: "Email",
                password_label: "Senha",
                button_label: "Registrar",
                loading_button_label: "Registrando...",
                password_input_placeholder: "Sua senha",
                email_input_placeholder: "Seu email",
              },
              forgotten_password: {
                link_text: "Esqueceu sua senha?",
                button_label: "Enviar instruções",
                confirmation_text: "Enviamos as instruções para seu email",
              },
            }
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/client/dashboard`}
        />
      </div>
    </div>
  );
}