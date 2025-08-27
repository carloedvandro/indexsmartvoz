import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RegisterFormData, registerFormSchema } from "./RegisterSchema";
import { StepIndicator } from "./StepIndicator";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { AddressStep } from "./steps/AddressStep";
import { AccountInfoStep } from "./steps/AccountInfoStep";
import { PasswordStep } from "./steps/PasswordStep";
import { useStepNavigation } from "./hooks/useStepNavigation";
import { useStepValidation } from "./hooks/useStepValidation";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { FlowProps } from "@/hooks/useFlowRegisterUser";

export const StepFormContainer = ({ onBack, onComplete }: FlowProps) => {
  const [searchParams] = useSearchParams();
  const sponsorId = searchParams.get("sponsor");
  const { toast } = useToast();

  const {
    currentStep,
    totalSteps,
    stepTitles,
    isLastStep,
    error,
    setError,
    handleNext,
    handlePrevious,
  } = useStepNavigation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      cpf_cnpj: "",
      sponsor_Id: sponsorId || "",
      referred_code: "",
      birthDate: "",
      phone: ""
    },
    mode: "onChange",
  });

  const { validateCurrentStep } = useStepValidation(form);
  const { isSubmitting, onSubmit } = useFormSubmission();

  const handleNextStep = async () => {
    try {
      const isValid = await validateCurrentStep(currentStep);
      handleNext(isValid);
    } catch (error) {
      console.error(`💥 [STEP ${currentStep}] ERRO NO handleNext:`, error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = async (data: RegisterFormData) => {
 
    try {
      setError(null);
      await onSubmit(data);
    } catch (error: any) {
      const errorMessage =
        error.message || "Ocorreu um erro ao criar sua conta.";
      setError(errorMessage);
    }
  };

  const renderCurrentStep = () => {
    console.log(`🎨 Renderizando step ${currentStep}`);

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <AccountInfoStep form={form} disableSponsor={!!sponsorId} />;
      case 3:
        return <PasswordStep form={form} />;
      default:
        console.warn(`⚠️ Step ${currentStep} não reconhecido, usando step 1`);
        return <PersonalInfoStep form={form} />;
    }
  };

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

      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {renderCurrentStep()}

        <div className="flex justify-between mt-8 gap-4">
          {currentStep === 1 ? (
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={onBack}
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
              onClick={handleNextStep}
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
