
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { RegisterFormData } from "../RegisterSchema";

export const useStepValidation = (form: UseFormReturn<RegisterFormData>) => {
  const { toast } = useToast();

  const validateCurrentStep = async (currentStep: number): Promise<boolean> => {
    console.log(`🔍 [STEP ${currentStep}] === INICIANDO VALIDAÇÃO ===`);
    
    const fieldsToValidate: (keyof RegisterFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate.push("full_name", "email", "cpf_cnpj", "birthDate");
        break;
      case 2:
        fieldsToValidate.push("whatsapp");
        break;
      case 3:
        fieldsToValidate.push("cep", "street", "neighborhood", "number", "city", "state");
        break;
      case 4:
        fieldsToValidate.push("referred_code");
        break;
      case 5:
        fieldsToValidate.push("password", "passwordConfirmation");
        break;
    }

    console.log(`🔍 [STEP ${currentStep}] Campos para validar:`, fieldsToValidate);
    
    const currentValues = form.getValues();
    console.log(`📋 [STEP ${currentStep}] Valores atuais:`, {
      referred_code: currentValues.referred_code,
      sponsor_Id: currentValues.sponsor_Id,
      full_name: currentValues.full_name ? '[PRESENT]' : '[EMPTY]',
      email: currentValues.email ? '[PRESENT]' : '[EMPTY]',
      password: currentValues.password ? '[PROTECTED]' : '[EMPTY]',
      passwordConfirmation: currentValues.passwordConfirmation ? '[PROTECTED]' : '[EMPTY]'
    });
    
    try {
      console.log(`🔄 [STEP ${currentStep}] Executando form.trigger...`);
      const isValid = await form.trigger(fieldsToValidate);
      console.log(`✅/❌ [STEP ${currentStep}] Resultado form.trigger:`, isValid);
      
      if (!isValid) {
        const errors = form.formState.errors;
        console.log(`❌ [STEP ${currentStep}] Erros encontrados:`, errors);
        
        for (const field of fieldsToValidate) {
          if (errors[field]) {
            const errorMessage = errors[field]?.message || `Erro no campo ${field}`;
            console.log(`🚨 [STEP ${currentStep}] Primeiro erro: ${field} - ${errorMessage}`);
            toast({
              title: "Erro de validação",
              description: errorMessage,
              variant: "destructive",
            });
            break;
          }
        }
        
        return false;
      }
      
      console.log(`🎉 [STEP ${currentStep}] === VALIDAÇÃO PASSOU COM SUCESSO! ===`);
      return true;
      
    } catch (error) {
      console.error(`💥 [STEP ${currentStep}] Erro durante validação:`, error);
      toast({
        title: "Erro de validação",
        description: "Ocorreu um erro durante a validação. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { validateCurrentStep };
};
