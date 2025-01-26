import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RainbowButton } from "@/components/ui/rainbow-button";

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
      } else if (event === 'USER_UPDATED') {
        // Atualizar a sessão quando o usuário for atualizado
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/client/dashboard');
        }
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
                display: 'none',
              },
              anchor: {
                color: '#5f0889',
                textDecoration: 'none',
                fontSize: '0.875rem',
                textShadow: '1px 1px 2px rgba(95, 8, 137, 0.2)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                display: 'inline-block',
                ':hover': {
                  transform: 'translateY(-2px)',
                  textShadow: '2px 2px 4px rgba(95, 8, 137, 0.3)',
                }
              },
              input: {
                borderRadius: '0.75rem',
                border: '1px solid #E5E7EB',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                fontSize: '1rem',
                width: '100%',
                backgroundColor: 'white',
                color: '#1F2937',
              },
              message: {
                color: '#EF4444',
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
              message: 'text-sm text-red-500',
              anchor: 'text-primary hover:text-primary/80 transition-all duration-300',
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
          view="sign_in"
          showLinks={true}
        />

        <div className="mt-4">
          <RainbowButton 
            className="w-full"
            onClick={() => {
              const email = document.querySelector('input[type="email"]') as HTMLInputElement;
              const password = document.querySelector('input[type="password"]') as HTMLInputElement;
              if (email && password) {
                supabase.auth.signInWithPassword({
                  email: email.value,
                  password: password.value,
                });
              }
            }}
          >
            Entrar
          </RainbowButton>
        </div>

        {/* Icons for inputs */}
        <style>{`
          .supabase-auth-ui_ui-input[type="email"] {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%236B21A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>');
            background-repeat: no-repeat;
            background-position: 12px center;
            background-size: 20px;
            padding-left: 40px !important;
          }
          .supabase-auth-ui_ui-input[type="password"] {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%236B21A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>');
            background-repeat: no-repeat;
            background-position: 12px center;
            background-size: 20px;
            padding-left: 40px !important;
          }
          
          .supabase-auth-ui_ui-anchor {
            background: linear-gradient(to bottom, transparent 50%, rgba(95, 8, 137, 0.1) 50%);
            background-size: 100% 200%;
            background-position: 0 0;
            transition: all 0.3s ease;
            padding: 2px 4px;
            border-radius: 4px;
          }
          
          .supabase-auth-ui_ui-anchor:hover {
            background-position: 0 100%;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </div>
  );
}