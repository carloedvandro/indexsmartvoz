import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
      if (event === 'SIGNED_IN' && session) {
        navigate('/client/dashboard');
      } else if (event === 'SIGNED_OUT') {
        navigate('/client/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="w-full md:w-[480px] bg-white p-8 flex flex-col">
        <div className="flex-1">
          <img
            src="/lovable-uploads/5c77d143-7f3e-4121-ae56-dbc5a3779756.png"
            alt="Y-TECH Logo"
            className="h-12 w-auto mb-12"
          />
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: '#004d31',
                  color: 'white',
                  borderRadius: '4px',
                },
                anchor: {
                  color: '#666666',
                  textDecoration: 'none',
                },
                input: {
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                },
                message: {
                  color: '#004d31',
                },
                label: {
                  color: '#333333',
                }
              },
              variables: {
                default: {
                  colors: {
                    brand: '#004d31',
                    brandAccent: '#00693e',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Usuário ou E-mail",
                  password_label: "Senha",
                  button_label: "Entrar",
                  loading_button_label: "Entrando...",
                  password_input_placeholder: "Sua senha",
                  email_input_placeholder: "Seu e-mail",
                },
                sign_up: {
                  link_text: "Registre-se",
                  email_label: "E-mail",
                  password_label: "Senha",
                  button_label: "Registrar",
                  loading_button_label: "Registrando...",
                  password_input_placeholder: "Sua senha",
                  email_input_placeholder: "Seu e-mail",
                },
                forgotten_password: {
                  link_text: "Recuperar senha",
                  button_label: "Enviar instruções",
                  confirmation_text: "Enviamos as instruções para seu e-mail",
                },
              }
            }}
            theme="default"
            providers={[]}
            redirectTo={`${window.location.origin}/client/dashboard`}
            view="sign_in"
            showLinks={false}
            authCallback={(event) => {
              if (event.error?.message.includes('Invalid login credentials')) {
                toast.error('E-mail ou senha incorretos');
              } else if (event.error) {
                toast.error('Erro ao fazer login. Tente novamente.');
              }
            }}
          />
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <span>Tecnologia por </span>
          <a href="https://wi.digital" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Yrwen Technology®
          </a>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden md:block flex-1 bg-[#004d31] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </div>
  );
}