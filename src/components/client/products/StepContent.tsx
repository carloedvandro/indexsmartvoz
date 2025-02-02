import { PlanSelectionStep } from "./PlanSelectionStep";
import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";

interface StepContentProps {
  currentStep: number;
  selectedLines: any[];
  selectedDueDate: number | null;
  acceptedTerms: boolean;
  setSelectedLines: (lines: any[]) => void;
  setSelectedDueDate: (date: number) => void;
  setAcceptedTerms: (accepted: boolean) => void;
}

export function StepContent({
  currentStep,
  selectedLines,
  selectedDueDate,
  acceptedTerms,
  setSelectedLines,
  setSelectedDueDate,
  setAcceptedTerms,
}: StepContentProps) {
  return (
    <>
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
    </>
  );
}