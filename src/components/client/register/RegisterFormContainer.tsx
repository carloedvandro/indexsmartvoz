
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@/components/client/RegisterForm";
import type { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { useToast } from "@/hooks/use-toast";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { FacialBiometryFlow } from "./facial-biometry/FacialBiometryFlow";

export const RegisterFormContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registerUser } = useRegisterUser();
  const [formData, setFormData] = useState<RegisterFormData | null>(null);
  const [showBiometry, setShowBiometry] = useState(false);

  const handleSubmit = async (values: RegisterFormData) => {
    try {
      console.log("Starting registration process with values:", {
        ...values,
        password: "[PROTECTED]",
      });

      setFormData(values);
      setShowBiometry(true);

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

  const handleBiometryComplete = async () => {
    if (!formData) return;

    try {
      await registerUser(formData);

      toast({
        title: "Verificação biométrica concluída",
        description: "Agora vamos verificar seus documentos.",
      });

      // TODO: Implement document verification flow here
      // For now, we'll just simulate it with a delay
      setTimeout(() => {
        toast({
          title: "Conta criada!",
          description: "Sua conta foi criada com sucesso. Redirecionando para o dashboard...",
        });

        setTimeout(() => {
          navigate("/client/dashboard");
        }, 2000);
      }, 2000);
    } catch (error: any) {
      console.error("Registration error after biometry:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="px-6 sm:px-5 py-2">
      {!showBiometry ? (
        <>
          <p className="mt-1 text-center text-sm text-gray-600 max-w-[140%] mx-auto">
            Preencha os dados abaixo para criar sua conta
          </p>
          <div className="mt-4">
            <RegisterForm onSubmit={handleSubmit} />
          </div>
        </>
      ) : (
        <FacialBiometryFlow 
          onComplete={handleBiometryComplete}
          onBack={() => setShowBiometry(false)}
        />
      )}
    </div>
  );
};
