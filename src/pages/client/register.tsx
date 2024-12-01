import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RegisterForm, RegisterFormData } from "@/components/client/RegisterForm";
import { useToast } from "@/hooks/use-toast";

export default function ClientRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (values: RegisterFormData) => {
    try {
      let sponsorId = null;

      // Check if sponsor custom ID exists
      if (values.sponsorCustomId) {
        const { data: sponsor, error: sponsorError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.sponsorCustomId)
          .single();

        if (sponsorError) {
          toast({
            title: "Erro",
            description: "ID do patrocinador inválido",
            variant: "destructive",
          });
          return;
        }

        sponsorId = sponsor.id;
      }

      // Check if custom_id is already in use
      const { data: existingCustomId, error: customIdError } = await supabase
        .from("profiles")
        .select("id")
        .eq("custom_id", values.customId)
        .single();

      if (existingCustomId) {
        toast({
          title: "Erro",
          description: "Este ID personalizado já está em uso",
          variant: "destructive",
        });
        return;
      }

      // Create user account with metadata - the trigger will create the profile
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            custom_id: values.customId,
            document_id: values.cpf,
            sponsor_id: sponsorId
          },
          emailRedirectTo: `${window.location.origin}/client/dashboard`
        },
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        if (signUpError.message.includes('already registered')) {
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

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso! Você será redirecionado em instantes.",
      });

      // Wait a moment before redirecting to ensure the toast is visible
      setTimeout(() => {
        navigate("/client/login");
      }, 2000);

    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        <RegisterForm onSubmit={handleSubmit} />

        <div className="text-center">
          <button
            onClick={() => navigate("/client/login")}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </div>
    </div>
  );
}