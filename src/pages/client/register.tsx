import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RegisterForm, RegisterFormData } from "@/components/client/RegisterForm";

export default function ClientRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (values: RegisterFormData) => {
    try {
      // Verificar se o usuário já existe no auth
      const { data: authUser, error: authCheckError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      // Se conseguir fazer login, significa que o usuário já existe
      if (authUser?.user) {
        toast({
          title: "Erro",
          description: "Este email já está cadastrado",
          variant: "destructive",
        });
        return;
      }

      // Verificar se o ID personalizado já existe
      const { data: existingCustomIds, error: customIdError } = await supabase
        .from('profiles')
        .select('custom_id')
        .eq('custom_id', values.customId);

      if (customIdError) throw customIdError;

      if (existingCustomIds && existingCustomIds.length > 0) {
        toast({
          title: "Erro",
          description: "Este ID personalizado já está em uso",
          variant: "destructive",
        });
        return;
      }

      // Se houver um ID de indicação, verificar se ele existe
      let sponsorId = null;
      if (values.referralId) {
        const { data: sponsorData, error: sponsorError } = await supabase
          .from('profiles')
          .select('id')
          .eq('custom_id', values.referralId)
          .limit(1);

        if (sponsorError) throw sponsorError;

        if (!sponsorData || sponsorData.length === 0) {
          toast({
            title: "Erro",
            description: "ID de indicação inválido",
            variant: "destructive",
          });
          return;
        }
        sponsorId = sponsorData[0].id;
      }

      // Criar o usuário no Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error("Erro ao criar usuário");
      }

      // Criar o perfil manualmente (caso o trigger não funcione)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: values.email,
          full_name: values.fullName,
          document_id: values.cpf,
          custom_id: values.customId,
          sponsor_id: sponsorId,
          role: 'client'
        });

      if (profileError) throw profileError;

      toast({
        title: "Sucesso",
        description: "Conta criada com sucesso! Verifique seu email para confirmar o cadastro.",
      });

      navigate("/client/login");
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Tratamento específico para erro de usuário já existente
      if (error.message?.includes('User already registered')) {
        toast({
          title: "Erro",
          description: "Este email já está cadastrado",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}