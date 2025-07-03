
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RegisterFormData } from "../RegisterSchema";
import { registerUserWithAddress } from "@/services/user/userRegisterTransaction";

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      
      console.log("🚀 Iniciando cadastro completo via edge function:", {
        email: data.email,
        fullName: data.fullName,
        customId: data.customId,
        sponsorCustomId: data.sponsorCustomId,
        hasWhatsapp: !!data.whatsapp,
        hasAddress: !!(data.cep && data.street && data.city),
        hasCpf: !!data.cpf
      });
      
      const result = await registerUserWithAddress(data);
      
      console.log("✅ Cadastro e login automático realizados com sucesso!", result);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para verificação biométrica...",
      });
      
      // Redirecionar imediatamente para biometria facial, pois usuário já está logado
      setTimeout(() => {
        navigate("/client/facial-biometry");
      }, 1500);
      
    } catch (error: any) {
      console.error("❌ Erro no cadastro:", error);
      
      // Usar a mensagem de erro específica que vem do serviço
      const errorMessage = error.message || "Ocorreu um erro ao criar sua conta.";
      
      console.log("🔍 Mensagem de erro capturada:", errorMessage);
      
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    onSubmit
  };
};
