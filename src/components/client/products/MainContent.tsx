
import { Card, CardContent } from "@/components/ui/card";
import { OrderReviewStep } from "./OrderReviewStep";
import TermoContratacaoSmartvoz from "./TermoContratacaoSmartvoz";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useStepValidator } from "./StepValidator";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/animations";

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
    console.log('🔍 Estado atual completo:', {
      currentStep,
      acceptedTerms,
      hasInternet: selectedLines[0]?.internet,
      hasDDD: selectedLines[0]?.ddd,
      selectedDueDate,
      typeof_acceptedTerms: typeof acceptedTerms
    });

    if (currentStep === 1) {
      // Only enable if internet plan, DDD and due date are selected
      return !selectedLines[0]?.internet || !selectedLines[0]?.ddd || !selectedDueDate;
    }
    
    if (currentStep === 3) {
      const disabled = !acceptedTerms;
      console.log('🎯 Step 3 - Botão desabilitado?', disabled, 'acceptedTerms:', acceptedTerms);
      return disabled;
    }
    
    return false;
  };

  const handleTermsChange = (accepted: boolean) => {
    console.log('🔄 MainContent recebeu mudança de termos:', accepted);
    setAcceptedTerms(accepted);
  };


  const buttonDisabled = isContinueDisabled();
  console.log('🔧 Botão vai ser renderizado com disabled:', buttonDisabled);

  return (
    <motion.div 
      className="flex flex-col items-center min-h-screen bg-white pt-12 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-[365px] mx-auto">
        <Card className="relative z-10 shadow-none bg-transparent border-0">
          <CardContent className="w-full px-0">
            <motion.div variants={itemVariants} className="w-full">
              {currentStep === 1 && (
                <PlanSelectionStep 
                  selectedLines={selectedLines}
                  setSelectedLines={setSelectedLines}
                  selectedDueDate={selectedDueDate}
                  setSelectedDueDate={setSelectedDueDate}
                  onBack={handleBack}
                  onContinue={validateAndContinue}
                />
              )}

              {currentStep === 2 && (
                <OrderReviewStep selectedLines={selectedLines} />
              )}

              {currentStep === 3 && (
                <TermoContratacaoSmartvoz
                  acceptedTerms={acceptedTerms}
                  onTermsChange={handleTermsChange}
                />
              )}
            </motion.div>

            {/* Only show navigation buttons for steps 2 and 3 */}
            {currentStep > 1 && (
              <motion.div variants={itemVariants} className="w-full mx-auto mt-6">
                <NavigationButtons 
                  handleBack={handleBack}
                  handleContinue={validateAndContinue}
                  disabled={buttonDisabled}
                />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
