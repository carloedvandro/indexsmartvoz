import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "./NavigationButtons";
import { StepContent } from "./StepContent";

interface MainContentProps {
  currentStep: number;
  selectedLines: any[];
  selectedDueDate: number | null;
  acceptedTerms: boolean;
  setSelectedLines: (lines: any[]) => void;
  setSelectedDueDate: (date: number) => void;
  setAcceptedTerms: (accepted: boolean) => void;
  handleBack: () => void;
  handleContinue: () => void;
}

export function MainContent({
  currentStep,
  selectedLines,
  selectedDueDate,
  acceptedTerms,
  setSelectedLines,
  setSelectedDueDate,
  setAcceptedTerms,
  handleBack,
  handleContinue
}: MainContentProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateAndContinue = () => {
    if (currentStep === 1) {
      if (!selectedLines[0]?.ddd) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, preencha o DDD antes de continuar",
          variant: "destructive",
        });
        return;
      }
      if (!selectedDueDate) {
        toast({
          title: "Erro",
          description: "Selecione uma data de vencimento para continuar",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 3 && !acceptedTerms) {
      toast({
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos para continuar",
        variant: "destructive",
      });
      return;
    }

    handleContinue();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] max-w-[440px]">
        <div className="p-6 flex flex-col items-center justify-center">
          <StepContent
            currentStep={currentStep}
            selectedLines={selectedLines}
            selectedDueDate={selectedDueDate}
            acceptedTerms={acceptedTerms}
            setSelectedLines={setSelectedLines}
            setSelectedDueDate={setSelectedDueDate}
            setAcceptedTerms={setAcceptedTerms}
          />
          
          <NavigationButtons
            currentStep={currentStep}
            handleBack={handleBack}
            handleContinue={validateAndContinue}
          />
        </div>
      </div>
    </div>
  );
}