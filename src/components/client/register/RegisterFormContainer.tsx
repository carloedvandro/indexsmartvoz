
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

      // Save form data to session storage
      sessionStorage.setItem('registrationData', JSON.stringify({
        ...values,
        password: undefined, // Don't store sensitive data
        passwordConfirmation: undefined
      }));

      setFormData(values);
      setShowBiometry(true);

    } catch (error: any) {
      console.error("Detailed registration error:", error);
      
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleBiometryComplete = async (verificationData: { 
    facialVerification: boolean;
    documentVerification: boolean;
  }) => {
    if (!formData) return;

    try {
      if (!verificationData.facialVerification || !verificationData.documentVerification) {
        throw new Error("É necessário completar a verificação facial e de documentos");
      }

      await registerUser(formData);

      // Clear session storage after successful registration
      sessionStorage.removeItem('registrationData');

      toast({
        title: "Cadastro concluído!",
        description: "Sua conta foi criada com sucesso. Redirecionando para o dashboard...",
      });

      setTimeout(() => {
        navigate("/client/dashboard");
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
