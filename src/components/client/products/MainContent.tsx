
import { Card, CardContent } from "@/components/ui/card";
import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useStepValidator } from "./StepValidator";
import { motion } from "framer-motion";

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

  // Check if continue button should be disabled
  const isContinueDisabled = () => {
    if (currentStep === 1) {
      // Only enable if internet plan, DDD and due date are selected
      return !selectedLines[0]?.internet || !selectedLines[0]?.ddd || !selectedDueDate;
    }
    
    if (currentStep === 3) {
      return !acceptedTerms;
    }
    
    return false;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-h-screen bg-gray-50/80 pt-12 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-[350px] mx-auto">
        <Card className="relative z-10 shadow-none bg-transparent border-0">
          <CardContent className="w-full px-0">
            <motion.div variants={itemVariants} className="w-full">
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
            </motion.div>

            <motion.div variants={itemVariants} className="w-full mx-auto mt-6">
              <NavigationButtons 
                currentStep={currentStep}
                handleBack={handleBack}
                handleContinue={validateAndContinue}
                disabled={isContinueDisabled()}
              />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
