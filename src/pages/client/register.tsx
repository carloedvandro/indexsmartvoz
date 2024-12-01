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
      if (values.referralId) {
        const { data: sponsorData, error: sponsorError } = await supabase
          .from('profiles')
          .select('id')
          .eq('custom_id', values.referralId);

        if (sponsorError) throw sponsorError;

        if (!sponsorData || sponsorData.length === 0) {
          toast({
            title: "Erro",
            description: "ID de indicação inválido",
            variant: "destructive",
          });
          return;
        }
      }

      // Criar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Buscar o ID do sponsor se existir
        let sponsorId = null;
        if (values.referralId) {
          const { data: sponsorData } = await supabase
            .from('profiles')
            .select('id')
            .eq('custom_id', values.referralId)
            .single();
          
          if (sponsorData) {
            sponsorId = sponsorData.id;
          }
        }

        // Atualizar o perfil com informações adicionais
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: values.fullName,
            document_id: values.cpf,
            custom_id: values.customId,
            sponsor_id: sponsorId,
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Sucesso",
          description: "Conta criada com sucesso! Verifique seu email para confirmar o cadastro.",
        });

        navigate("/client/login");
      }
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