import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RegisterForm, RegisterFormData } from "@/components/client/RegisterForm";
import { useToast } from "@/hooks/use-toast";
import { checkExistingCpf } from "@/components/admin/UserFormUtils";

export default function ClientRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (values: RegisterFormData) => {
    try {
      // Verificar CPF duplicado
      if (await checkExistingCpf(values.cpf)) {
        toast({
          title: "Erro",
          description: "Este CPF já está cadastrado no sistema",
          variant: "destructive",
        });
        return;
      }

      let sponsorId = null;

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

      const { data: existingCustomId } = await supabase
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

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            custom_id: values.customId,
            cpf: values.cpf,
            sponsor_id: sponsorId,
          },
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

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          custom_id: values.customId,
          sponsor_id: sponsorId,
          cpf: values.cpf,
        })
        .eq('id', authData.user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso! Você será redirecionado em instantes.",
      });

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
    <div 
      className="h-screen w-screen overflow-auto bg-gray-50 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80")',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 w-full max-w-md p-6 m-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Criar nova conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Preencha os dados abaixo para criar sua conta
        </p>
        
        <div className="mt-8">
          <RegisterForm onSubmit={handleSubmit} />
        </div>

        <div className="text-center mt-6">
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