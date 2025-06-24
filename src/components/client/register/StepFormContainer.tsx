
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { StepIndicator } from "./StepIndicator";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { ContactInfoStep } from "./steps/ContactInfoStep";
import { AddressStep } from "./steps/AddressStep";
import { AccountInfoStep } from "./steps/AccountInfoStep";
import { PasswordStep } from "./steps/PasswordStep";
import { registerUserWithAddress } from "@/services/user/userRegisterTransaction";

const stepTitles = ["Dados Pessoais", "Contato", "Endereço", "Conta", "Senha"];
const totalSteps = stepTitles.length;

export const StepFormContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get("sponsor");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      cpf: "",
      sponsorCustomId: sponsorId || "",
      customId: "",
      birthDate: "",
      whatsapp: "",
      secondaryWhatsapp: "",
      cep: "",
      street: "",
      neighborhood: "",
      number: "",
      city: "",
      state: "",
      complement: "",
    },
    mode: "onChange"
  });

  const validateCurrentStep = async (): Promise<boolean> => {
    console.log(`🔍 [STEP ${currentStep}] === INICIANDO VALIDAÇÃO ===`);
    
    const fieldsToValidate: (keyof RegisterFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate.push("fullName", "email", "cpf", "birthDate");
        break;
      case 2:
        fieldsToValidate.push("whatsapp");
        break;
      case 3:
        fieldsToValidate.push("cep", "street", "neighborhood", "number", "city", "state");
        break;
      case 4:
        fieldsToValidate.push("customId");
        // sponsorCustomId é opcional, não incluir na validação obrigatória
        break;
      case 5:
        fieldsToValidate.push("password", "passwordConfirmation");
        break;
    }

    console.log(`🔍 [STEP ${currentStep}] Campos para validar:`, fieldsToValidate);
    
    // Obter valores atuais do formulário
    const currentValues = form.getValues();
    console.log(`📋 [STEP ${currentStep}] Valores atuais:`, {
      customId: currentValues.customId,
      sponsorCustomId: currentValues.sponsorCustomId,
      fullName: currentValues.fullName ? '[PRESENT]' : '[EMPTY]',
      email: currentValues.email ? '[PRESENT]' : '[EMPTY]',
      password: currentValues.password ? '[PROTECTED]' : '[EMPTY]',
      passwordConfirmation: currentValues.passwordConfirmation ? '[PROTECTED]' : '[EMPTY]'
    });
    
    // Limpar erros anteriores
    form.clearErrors();
    
    try {
      console.log(`🔄 [STEP ${currentStep}] Executando form.trigger...`);
      const isValid = await form.trigger(fieldsToValidate);
      console.log(`✅/❌ [STEP ${currentStep}] Resultado form.trigger:`, isValid);
      
      if (!isValid) {
        const errors = form.formState.errors;
        console.log(`❌ [STEP ${currentStep}] Erros encontrados:`, errors);
        
        // Encontrar o primeiro erro e mostrá-lo
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

      // Validação adicional específica para step 4
      if (currentStep === 4) {
        const customIdValue = currentValues.customId;
        console.log(`🔍 [STEP 4] Validação extra - customId:`, customIdValue);
        
        if (!customIdValue || customIdValue.trim().length < 3) {
          console.log(`❌ [STEP 4] customId inválido:`, customIdValue);
          toast({
            title: "Erro de validação",
            description: "ID personalizado deve ter pelo menos 3 caracteres",
            variant: "destructive",
          });
          return false;
        }

        if (!/^[a-zA-Z0-9]+$/.test(customIdValue)) {
          console.log(`❌ [STEP 4] customId formato inválido:`, customIdValue);
          toast({
            title: "Erro de validação", 
            description: "ID personalizado deve conter apenas letras e números",
            variant: "destructive",
          });
          return false;
        }
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

  const handleNext = async () => {
    console.log(`🚀 [STEP ${currentStep}] === CLICOU EM PRÓXIMO ===`);
    console.log(`📊 [STEP ${currentStep}] Estado atual: currentStep=${currentStep}, totalSteps=${totalSteps}`);
    
    try {
      console.log(`🔄 [STEP ${currentStep}] Chamando validateCurrentStep...`);
      const isValid = await validateCurrentStep();
      console.log(`🔍 [STEP ${currentStep}] validateCurrentStep retornou:`, isValid);
      
      if (isValid && currentStep < totalSteps) {
        const nextStep = currentStep + 1;
        console.log(`➡️ [STEP ${currentStep}] AVANÇANDO PARA STEP ${nextStep}`);
        setCurrentStep(nextStep);
        setError(null);
        
        // Log de confirmação
        setTimeout(() => {
          console.log(`✅ [STEP ${nextStep}] === STEP ${nextStep} CARREGADO COM SUCESSO ===`);
        }, 100);
        
      } else {
        console.log(`⛔ [STEP ${currentStep}] NÃO FOI POSSÍVEL AVANÇAR. isValid=${isValid}, currentStep=${currentStep}, totalSteps=${totalSteps}`);
        
        if (!isValid) {
          console.log(`❌ [STEP ${currentStep}] VALIDAÇÃO FALHOU - permanecendo no step ${currentStep}`);
        }
        if (currentStep >= totalSteps) {
          console.log(`⚠️ [STEP ${currentStep}] JÁ ESTÁ NO ÚLTIMO STEP`);
        }
      }
    } catch (error) {
      console.error(`💥 [STEP ${currentStep}] ERRO NO handleNext:`, error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      console.log(`⬅️ Voltando do step ${currentStep} para ${currentStep - 1}`);
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      console.log("🚀 Iniciando cadastro completo:", {
        email: data.email,
        fullName: data.fullName,
        customId: data.customId,
        sponsorCustomId: data.sponsorCustomId,
        hasWhatsapp: !!data.whatsapp,
        hasAddress: !!(data.cep && data.street && data.city),
        hasCpf: !!data.cpf
      });
      
      await registerUserWithAddress(data);
      
      console.log("✅ Cadastro realizado com sucesso!");
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para verificação biométrica...",
      });
      
      setTimeout(() => {
        navigate("/client/facial-biometry");
      }, 1500);
      
    } catch (error: any) {
      console.error("❌ Erro no cadastro:", error);
      const errorMessage = error.message || "Ocorreu um erro ao criar sua conta.";
      setError(errorMessage);
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const renderCurrentStep = () => {
    console.log(`🎨 Renderizando step ${currentStep}`);
    
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <ContactInfoStep form={form} />;
      case 3:
        return <AddressStep form={form} />;
      case 4:
        return <AccountInfoStep form={form} disableSponsor={!!sponsorId} />;
      case 5:
        return <PasswordStep form={form} />;
      default:
        console.warn(`⚠️ Step ${currentStep} não reconhecido, usando step 1`);
        return <PersonalInfoStep form={form} />;
    }
  };

  const isLastStep = currentStep === totalSteps;
  
  console.log(`🔄 Renderizando StepFormContainer - currentStep: ${currentStep}, isLastStep: ${isLastStep}`);

  return (
    <Form {...form}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro no cadastro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitles={stepTitles}
      />
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8 gap-4">
          {currentStep === 1 ? (
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={handlePrevious}
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
          )}
          
          {isLastStep ? (
            <Button 
              type="submit"
              className="w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Finalizar Cadastro"
              )}
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
