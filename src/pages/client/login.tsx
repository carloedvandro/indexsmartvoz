import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function ClientLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          toast({
            title: t('error'),
            description: t('login_error'),
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          navigate("/client/dashboard");
        }
      } else if (event === 'SIGNED_OUT') {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast, t]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t('client_area')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#00ffa3',
                    brandAccent: '#004d31',
                  },
                },
              },
              className: {
                anchor: 'text-gray-600 hover:text-gray-900',
                button: 'bg-[#00ffa3] hover:bg-[#004d31] text-white',
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/client/dashboard`}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Entrar",
                  loading_button_label: "Entrando...",
                  password_input_placeholder: "Digite sua senha",
                  email_input_placeholder: "Digite seu email",
                },
                forgotten_password: {
                  email_label: "Email",
                  button_label: "Enviar instruções",
                  loading_button_label: "Enviando...",
                  link_text: "Esqueceu sua senha?",
                  confirmation_text: "Verifique seu email para redefinir sua senha",
                },
              },
            }}
          />
          <div className="mt-4 text-center">
            <span className="text-gray-600">Não tem uma conta? </span>
            <Link 
              to="/register" 
              className="text-[#00ffa3] hover:text-[#004d31] font-medium"
            >
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}