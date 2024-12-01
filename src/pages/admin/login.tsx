import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se há um token de recuperação na URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const type = params.get('type');

    if (token && type === 'recovery') {
      // Se houver um token de recuperação, mostrar mensagem apropriada
      toast({
        title: "Redefinição de Senha",
        description: "Por favor, defina sua nova senha no formulário abaixo.",
        duration: 10000, // Aumentando para 10 segundos para dar mais tempo de leitura
      });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event); // Debug log
      console.log("Auth session:", session); // Debug log
      
      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Redefinição de Senha",
          description: "Por favor, defina sua nova senha no formulário abaixo.",
          duration: 10000,
        });
      } else if (event === 'SIGNED_IN') {
        if (session?.user) {
          // Verificar se o usuário é um admin antes de redirecionar
          const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          console.log("User role:", data?.role); // Debug log

          if (data?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            // Se não for admin, fazer logout e mostrar mensagem
            await supabase.auth.signOut();
            toast({
              title: "Acesso negado",
              description: "Esta área é restrita para administradores.",
              variant: "destructive",
              duration: 6000,
            });
          }
        }
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
                update_password: {
                  header_text: "Redefinir senha",
                  button_label: "Atualizar senha",
                  loading_button_label: "Atualizando senha...",
                  confirmation_text: "Sua senha foi atualizada com sucesso",
                },
              },
            }}
            providers={[]}
            redirectTo="https://ytech-saas.lovable.app/admin/login"
            theme="light"
          />
        </CardContent>
      </Card>
    </div>
  );
}