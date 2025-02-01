import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderReviewStep } from "./OrderReviewStep";
import { DueDateStep } from "./DueDateStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { useToast } from "@/hooks/use-toast";

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
    }
    handleContinue();
  };

  return (
    <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
      <CardContent className="p-6">
        {currentStep === 1 && (
          <PlanSelectionStep 
            selectedLines={selectedLines}
            setSelectedLines={setSelectedLines}
          />
        )}

        {currentStep === 2 && (
          <OrderReviewStep selectedLines={selectedLines} />
        )}

        {currentStep === 3 && (
          <DueDateStep
            selectedDueDate={selectedDueDate}
            onDueDateChange={setSelectedDueDate}
          />
        )}

        {currentStep === 4 && (
          <ContractTermsStep
            acceptedTerms={acceptedTerms}
            onTermsChange={setAcceptedTerms}
          />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={handleBack}
            >
              Voltar
            </Button>
          )}
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f] ml-auto text-white"
            onClick={validateAndContinue}
          >
            {currentStep === 4 ? 'Finalizar compra' : 'Continuar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}