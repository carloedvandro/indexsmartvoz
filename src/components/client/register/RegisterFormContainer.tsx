import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@/components/client/RegisterForm";
import type { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { useToast } from "@/hooks/use-toast";
import { useRegisterUser } from "@/hooks/useRegisterUser";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registerUser } = useRegisterUser();

  const handleSubmit = async (values: RegisterFormData) => {
    try {
      console.log("Starting registration process with values:", {
        ...values,
        password: "[PROTECTED]",
      });

      await registerUser(values);

      console.log("Registration completed, redirecting...");
      toast({
        title: "Conta criada!",
        description: "Sua conta foi criada com sucesso. Redirecionando para o login...",
      });

      // Delay before redirect to ensure toast is visible
      setTimeout(() => {
        navigate("/client/login");
      }, 2000);

    } catch (error: any) {
      console.error("Detailed registration error:", error);
      
      const errorMessage = error.message || 
        error.error_description || 
        "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.";

      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });

      throw error;
    }
  };

  return (
    <div className="px-6">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        Criar nova conta
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Preencha os dados abaixo para criar sua conta
      </p>
      <div className="mt-6">
        <RegisterForm onSubmit={handleSubmit} />
      </div>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => navigate("/client/login")}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Já tem uma conta? Faça login
        </button>
      </div>
    </div>
  );
};