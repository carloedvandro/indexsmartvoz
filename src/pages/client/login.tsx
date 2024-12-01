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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        navigate("/client/dashboard");
      } else if (event === 'SIGNED_OUT') {
        navigate("/");
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Recuperação de senha",
          description: "Verifique seu email para redefinir sua senha.",
        });
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
                  link_text: "Esqueceu sua senha?"
                },
              },
            }}
            providers={[]}
            view="sign_in"
          />
          <div className="mt-4 text-center">
            <Link 
              to="/client/register" 
              className="text-sm text-primary hover:underline"
            >
              Não é cadastrado? Cadastre-se aqui!
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}