import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock } from "lucide-react";

export default function ClientLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if we're on a password recovery route
    const isPasswordRecovery = window.location.hash.includes('#access_token') && 
                              window.location.hash.includes('type=recovery');

    if (isPasswordRecovery) {
      // Redirect recovery to the client password reset page
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-pink-500/20 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute left-1/3 top-1/2 w-80 h-80 bg-pink-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login container with glassmorphism effect */}
      <div className="w-full max-w-[500px] p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl relative z-10 mx-4">
        {/* Title with rainbow gradient animation */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#5F0889] to-[#0052CC] bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:400%_auto] mb-12 flex justify-center items-center w-[200px] mx-auto">
            Smartvoz
          </h1>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                background: 'linear-gradient(to right, #6B21A8, #D946EF, #818CF8)',
                color: 'white',
                borderRadius: '9999px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: '500',
                width: '100%',
                marginTop: '1rem',
                transition: 'all 0.3s ease',
              },
              anchor: {
                color: '#ffffff',
                opacity: '0.7',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'opacity 0.2s ease',
              },
              input: {
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                fontSize: '1rem',
                width: '100%',
                backgroundColor: 'transparent',
                color: '#ffffff',
              },
              message: {
                color: '#D946EF',
                marginTop: '0.5rem',
                fontSize: '0.875rem',
              },
              label: {
                color: '#ffffff',
                opacity: '0.7',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
              },
              container: {
                position: 'relative',
              },
            },
            className: {
              container: 'relative space-y-4',
              button: 'hover:opacity-90 transition-opacity',
              input: 'pl-10 focus:border-purple-600 focus:ring-purple-600',
              label: 'block text-sm font-medium text-gray-700 mb-1',
              message: 'text-sm text-purple-600 mt-1',
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
                link_text: "",
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
          theme="default"
          providers={[]}
          redirectTo={`${window.location.origin}/client/dashboard`}
          view="sign_in"
          showLinks={true}
        />

        {/* Icons for inputs - Added via CSS pseudo-elements */}
        <style>{`
          .supabase-auth-ui_ui-input[type="email"] {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>');
            background-repeat: no-repeat;
            background-position: 12px center;
            background-size: 20px;
            padding-left: 40px !important;
          }
          .supabase-auth-ui_ui-input[type="password"] {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>');
            background-repeat: no-repeat;
            background-position: 12px center;
            background-size: 20px;
            padding-left: 40px !important;
          }

          @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-rainbow {
            background-size: 400% auto;
            animation: rainbow 3s ease infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
