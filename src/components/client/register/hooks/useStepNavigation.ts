
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stepTitles = ["Dados Pessoais", "Conta", "Senha"];
const totalSteps = stepTitles.length;

export const useStepNavigation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = (isValid: boolean) => {
    console.log(`🚀 [STEP ${currentStep}] === CLICOU EM PRÓXIMO ===`);
    console.log(`📊 [STEP ${currentStep}] Estado atual: currentStep=${currentStep}, totalSteps=${totalSteps}`);
    
    if (isValid && currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      console.log(`➡️ [STEP ${currentStep}] AVANÇANDO PARA STEP ${nextStep}`);
      setCurrentStep(nextStep);
      setError(null);
      
      setTimeout(() => {
        console.log(`✅ [STEP ${nextStep}] === STEP ${nextStep} CARREGADO COM SUCESSO ===`);
      }, 100);
    } else {
      console.log(`⛔ [STEP ${currentStep}] NÃO FOI POSSÍVEL AVANÇAR. isValid=${isValid}, currentStep=${currentStep}, totalSteps=${totalSteps}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      console.log(`⬅️ Voltando do step ${currentStep} para ${currentStep - 1}`);
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    totalSteps,
    stepTitles,
    isLastStep,
    error,
    setError,
    handleNext,
    handlePrevious,
    handleBack
  };
};
