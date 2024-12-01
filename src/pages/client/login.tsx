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
            title: "Erro",
            description: "Erro ao carregar perfil do usuário",
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
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Área do Cliente</CardTitle>
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
                anchor: 'hidden',
                button: 'bg-[#00ffa3] hover:bg-[#004d31] text-white',
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
                  email_input_placeholder: "seu@email.com",
                },
              },
            }}
            providers={[]}
            view="sign_in"
          />
          <div className="mt-4 text-center space-y-2">
            <Link to="/reset-password" className="block text-sm text-gray-600 hover:text-gray-900">
              {t('forgot_password')}
            </Link>
            <Link to="/register" className="block text-sm text-gray-600 hover:text-gray-900">
              {t('dont_have_account')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}