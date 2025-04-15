
import { useToast } from "@/hooks/use-toast";

interface StepValidatorProps {
  currentStep: number;
  selectedLines: any[];
  selectedDueDate: number | null;
  acceptedTerms: boolean;
  handleContinue: () => void;
}

export function useStepValidator({ 
  currentStep, 
  selectedLines, 
  selectedDueDate, 
  acceptedTerms,
  handleContinue 
}: StepValidatorProps) {
  const { toast } = useToast();

  const validateAndContinue = () => {
    if (currentStep === 1) {
      if (!selectedLines[0]?.internet) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, selecione um plano de internet antes de continuar",
          variant: "destructive",
        });
        return;
      }
      
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

  return { validateAndContinue };
}
