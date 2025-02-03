import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 pt-16">
      <Card className="w-full max-w-[400px] shadow-sm bg-transparent">
        <CardContent>
          {currentStep === 1 && (
            <PlanSelectionStep 
              selectedLines={selectedLines}
              setSelectedLines={setSelectedLines}
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
            />
          )}

          {currentStep === 2 && (
            <OrderReviewStep selectedLines={selectedLines} />
          )}

          {currentStep === 3 && (
            <ContractTermsStep
              acceptedTerms={acceptedTerms}
              onTermsChange={setAcceptedTerms}
            />
          )}

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
            >
              Voltar
            </Button>
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={validateAndContinue}
            >
              {currentStep === 3 ? 'Continuar' : 'Continuar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}