import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ClientRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [sponsorInfo, setSponsorInfo] = useState<{ full_name: string } | null>(null);
  const sponsorId = searchParams.get('ref');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/client/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchSponsorInfo = async () => {
      if (sponsorId) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', sponsorId)
          .single();

        if (error) {
          toast({
            title: "Erro",
            description: "Código de referência inválido",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setSponsorInfo(data);
        }
      }
    };

    fetchSponsorInfo();
  }, [sponsorId, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
          {sponsorInfo && (
            <p className="text-center text-muted-foreground">
              Indicado por: {sponsorInfo.full_name}
            </p>
          )}
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
                sign_up: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Criar conta",
                  loading_button_label: "Criando conta...",
                  social_provider_text: "Cadastrar com {{provider}}",
                  link_text: "Não tem uma conta? Cadastre-se",
                },
                sign_in: {
                  email_label: "Email",
                  password_label: "Senha",
                  button_label: "Entrar",
                  loading_button_label: "Entrando...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Já tem uma conta? Entre",
                },
              },
            }}
            providers={[]}
            view="sign_up"
          />
        </CardContent>
      </Card>
    </div>
  );
}