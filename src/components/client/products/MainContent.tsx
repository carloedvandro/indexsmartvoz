import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useStepValidator } from "./StepValidator";
import { ParticlesBackground } from "./ParticlesBackground";

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
    <div className="flex flex-col items-center min-h-screen bg-transparent pt-32 relative">
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-[400px] bg-white rounded-lg">
        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
}