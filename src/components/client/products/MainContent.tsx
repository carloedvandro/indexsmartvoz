
import React from "react";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { OrderReviewStep } from "./OrderReviewStep";
import { TermsStep } from "./TermsStep";
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
  handleContinue,
}: MainContentProps) {
  const { validateAndContinue } = useStepValidator({
    currentStep,
    selectedLines,
    selectedDueDate,
    acceptedTerms,
    handleContinue,
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlanSelectionStep
            selectedLines={selectedLines}
            setSelectedLines={setSelectedLines}
            selectedDueDate={selectedDueDate}
            setSelectedDueDate={setSelectedDueDate}
            onContinue={validateAndContinue}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <OrderReviewStep
            selectedLines={selectedLines}
            selectedDueDate={selectedDueDate}
            handleBack={handleBack}
            handleContinue={validateAndContinue}
          />
        );
      case 3:
        return (
          <TermsStep
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            handleBack={handleBack}
            handleContinue={validateAndContinue}
          />
        );
      default:
        return null;
    }
  };

  return <div className="flex items-center justify-center w-full h-full">{renderStep()}</div>;
}
