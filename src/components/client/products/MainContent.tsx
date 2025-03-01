
import { Card, CardContent } from "@/components/ui/card";
import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useStepValidator } from "./StepValidator";
import { ParticlesBackground } from "./ParticlesBackground";
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
      className="flex flex-col items-center min-h-screen bg-gray-50/80 pt-32 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ParticlesBackground />
      <Card className="relative z-10 w-full max-w-[400px] shadow-none bg-transparent border-0">
        <CardContent>
          <motion.div variants={itemVariants}>
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

          <motion.div variants={itemVariants}>
            <NavigationButtons 
              currentStep={currentStep}
              handleBack={handleBack}
              handleContinue={validateAndContinue}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
