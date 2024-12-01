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
    // Verificar imediatamente se há um token de recuperação na URL
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');
    const type = params.get('type');

    if (token && type === 'recovery') {
      toast({
        title: "Redefinição de Senha",
        description: "Por favor, defina sua nova senha no formulário abaixo.",
        duration: 5000,
      });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Redefinição de Senha",
          description: "Por favor, defina sua nova senha no formulário abaixo.",
          duration: 5000,
        });
      } else if (event === 'SIGNED_IN') {
        if (session?.user) {
          const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (data?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
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
                },
                forgotten_password: {
                  link_text: "Esqueceu sua senha?",
                  button_label: "Recuperar senha",
                  loading_button_label: "Enviando instruções...",
                  confirmation_text: "Verifique seu email para redefinir sua senha",
                },
                update_password: {
                  password_label: "Nova senha",
                  button_label: "Atualizar senha",
                  loading_button_label: "Atualizando senha...",
                  confirmation_text: "Sua senha foi atualizada com sucesso",
                },
              },
            }}
            view="sign_in"
            showLinks={false}
            providers={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}