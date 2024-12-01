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
      // Primeiro, verificar se o email já existe
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', values.email)
        .single();

      if (existingUser) {
        toast({
          title: "Erro",
          description: "Este email já está cadastrado",
          variant: "destructive",
        });
        return;
      }

      // Verificar se o ID personalizado já existe
      const { data: existingCustomId } = await supabase
        .from('profiles')
        .select('custom_id')
        .eq('custom_id', values.customId)
        .single();

      if (existingCustomId) {
        toast({
          title: "Erro",
          description: "Este ID personalizado já está em uso",
          variant: "destructive",
        });
        return;
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
        // Atualizar o perfil com informações adicionais
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: values.fullName,
            document_id: values.cpf,
            custom_id: values.customId,
            sponsor_id: values.referralId || null,
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Sucesso",
          description: "Conta criada com sucesso! Verifique seu email para confirmar o cadastro.",
        });

        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
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