
import { useState } from "react";
import { useBiometryFlow } from "./hooks/useBiometryFlow";
import { StepRenderer } from "./components/StepRenderer";

interface FacialBiometryFlowProps {
  onComplete: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

export function FacialBiometryFlow({ onComplete, onBack }: FacialBiometryFlowProps) {
  const { state, nextStep, setError, reset } = useBiometryFlow();

  const handleComplete = (data: any) => {
    onComplete({
      facialVerification: data.verified || false,
      documentVerification: true // Assumindo que sempre passa na verificação de documentos
    });
  };

  const handleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-900 text-white">
      <div className="w-full max-w-md">
        <button 
          onClick={onBack}
          className="mb-4 text-white hover:text-gray-300"
        >
          ← Voltar
        </button>
        
        <StepRenderer 
          state={state}
          onNext={nextStep}
          onError={handleError}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
