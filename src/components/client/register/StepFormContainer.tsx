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
import { useRegisterUser } from "@/hooks/useRegisterUser";

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
  const { registerUser } = useRegisterUser();
  
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

  const validateCurrentStep = async () => {
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
        if (!sponsorId) {
          fieldsToValidate.push("sponsorCustomId");
        }
        break;
      case 5:
        fieldsToValidate.push("password", "passwordConfirmation");
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log("🚀 Iniciando cadastro com dados:", {
        email: data.email,
        fullName: data.fullName,
        customId: data.customId,
        sponsorCustomId: data.sponsorCustomId,
        hasWhatsapp: !!data.whatsapp,
        hasAddress: !!(data.cep && data.street && data.city)
      });
      
      await registerUser(data);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para verificação biométrica...",
      });
      
      // Dar um pequeno delay para mostrar o toast
      setTimeout(() => {
        navigate("/client/facial-biometry");
      }, 1000);
      
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
        return <PersonalInfoStep form={form} />;
    }
  };

  const isLastStep = currentStep === totalSteps;

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
