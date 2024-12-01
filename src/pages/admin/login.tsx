import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Recuperação de senha",
          description: "Por favor, aguarde alguns segundos antes de tentar novamente.",
          variant: "destructive"
        });
      }
      
      if (session?.user) {
        // Verificar se o usuário é um admin antes de redirecionar
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.role === "admin") {
              navigate("/admin/dashboard");
            }
          });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Área Administrativa</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#004d31',
                    brandAccent: '#00ffa3',
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
                  link_text: "Já tem uma conta? Entre",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Criar conta",
                  loading_button_label: "Criando conta...",
                  social_provider_text: "Cadastrar com {{provider}}",
                  link_text: "Não tem uma conta? Cadastre-se",
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
            theme="light"
          />
        </CardContent>
      </Card>
    </div>
  );
}