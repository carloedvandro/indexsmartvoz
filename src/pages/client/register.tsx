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
      // Check if custom_id already exists using a direct query
      const { data: existingCustomIds, error: customIdError } = await supabase
        .from('profiles')
        .select('id')
        .eq('custom_id', values.customId)
        .maybeSingle();

      if (customIdError) {
        console.error('Error checking custom ID:', customIdError);
        throw new Error("Erro ao verificar ID personalizado. Por favor, tente novamente.");
      }

      if (existingCustomIds) {
        toast({
          title: "Erro",
          description: "Este ID personalizado já está em uso",
          variant: "destructive",
        });
        return;
      }

      // Check if referral ID exists if provided
      let sponsorId = null;
      if (values.referralId) {
        const { data: sponsorData, error: sponsorError } = await supabase
          .from('profiles')
          .select('id')
          .eq('custom_id', values.referralId)
          .maybeSingle();

        if (sponsorError) {
          console.error('Error checking referral ID:', sponsorError);
          throw new Error("Erro ao verificar ID de indicação. Por favor, tente novamente.");
        }

        if (!sponsorData) {
          toast({
            title: "Erro",
            description: "ID de indicação inválido",
            variant: "destructive",
          });
          return;
        }
        sponsorId = sponsorData.id;
      }

      // Create the user in Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        if (signUpError.message.includes('User already registered')) {
          toast({
            title: "Erro",
            description: "Este email já está cadastrado",
            variant: "destructive",
          });
          return;
        }
        throw signUpError;
      }

      if (!authData.user) {
        throw new Error("Erro ao criar usuário");
      }

      // Update the profile with additional information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: values.fullName,
          document_id: values.cpf,
          custom_id: values.customId,
          sponsor_id: sponsorId,
          role: 'client'
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      toast({
        title: "Sucesso",
        description: "Conta criada com sucesso! Verifique seu email para confirmar o cadastro.",
      });

      navigate("/client/login");
    } catch (error: any) {
      console.error('Registration error:', error);
      
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