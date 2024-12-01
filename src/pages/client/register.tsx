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
      const { data: existingProfiles, error: profileCheckError } = await supabase
        .from('profiles')
        .select('custom_id')
        .eq('custom_id', values.customId);

      if (profileCheckError) throw profileCheckError;

      if (existingProfiles && existingProfiles.length > 0) {
        toast({
          title: "Erro",
          description: "Este ID personalizado já está em uso",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            cpf: values.cpf,
            custom_id: values.customId,
            sponsor_id: values.referralId || null,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Conta criada com sucesso! Verifique seu email para confirmar o cadastro.",
      });

      navigate("/");
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