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
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="w-full md:w-[480px] bg-white p-8 flex flex-col">
        <div className="flex-1">
          <img
            src="/lovable-uploads/5c77d143-7f3e-4121-ae56-dbc5a3779756.png"
            alt="Y-TECH Logo"
            className="h-8 w-auto mb-12"
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
          />
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <span>Tecnologia por </span>
          <a href="https://wi.digital" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            WI Digital
          </a>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden md:block flex-1 bg-[#004d31] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/b837a6d7-9b84-4d0d-bbe5-90cd8038957d.png')] bg-cover bg-center" />
        <img
          src="/lovable-uploads/5c77d143-7f3e-4121-ae56-dbc5a3779756.png"
          alt="Y-TECH Logo"
          className="absolute top-8 right-8 h-8 w-auto"
        />
      </div>
    </div>
  );
}