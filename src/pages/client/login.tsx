import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function ClientLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/client/dashboard");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
      } else if (event === 'USER_UPDATED') {
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram atualizadas com sucesso.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleAuthError = async (error: any) => {
    console.log("Auth error:", error);
    
    let errorMessage = "Ocorreu um erro durante a autenticação.";
    
    if (error.message.includes("Invalid login credentials")) {
      errorMessage = "Email não cadastrado ou senha incorreta.";
    } else if (error.message.includes("Email not confirmed")) {
      errorMessage = "Por favor, confirme seu email antes de fazer login.";
    }

    toast({
      title: "Erro de autenticação",
      description: errorMessage,
      variant: "destructive",
    });
  };

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
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Não tem uma conta? Cadastre-se",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Criar conta",
                  loading_button_label: "Criando conta...",
                  social_provider_text: "Cadastrar com {{provider}}",
                  link_text: "Já tem uma conta? Entre",
                },
                forgotten_password: {
                  link_text: "Esqueceu sua senha?",
                  button_label: "Recuperar senha",
                  loading_button_label: "Enviando instruções...",
                  confirmation_text: "Verifique seu email para redefinir sua senha",
                },
              },
            }}
            providers={[]}
            view="sign_in"
            redirectTo={`${window.location.origin}/client/dashboard`}
            onError={handleAuthError}
          />
        </CardContent>
      </Card>
    </div>
  );
}