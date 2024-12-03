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
      await registerUser(values);
      
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
        description: error.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
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
          onClick={() => navigate("/client/login")}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Já tem uma conta? Faça login
        </button>
      </div>
    </div>
  );
};