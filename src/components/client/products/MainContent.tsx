import { Card, CardContent } from "@/components/ui/card";
import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useStepValidator } from "./StepValidator";

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
  const { validateAndContinue } = useStepValidator({ 
    currentStep, 
    selectedLines, 
    selectedDueDate, 
    acceptedTerms,
    handleContinue 
  });

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 pt-8">
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

          <NavigationButtons 
            currentStep={currentStep}
            handleBack={handleBack}
            handleContinue={validateAndContinue}
          />
        </CardContent>
      </Card>
    </div>
  );
}