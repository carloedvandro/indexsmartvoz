
import { Check } from "lucide-react";

interface StepsProps {
  currentStep: string;
}

export const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    { id: 'cpf-verification', label: 'CPF' },
    { id: 'camera-access', label: 'Câmera' },
    { id: 'capture-instructions', label: 'Instruções' },
    { id: 'facial-capture', label: 'Selfie' },
    { id: 'document-type', label: 'Documento' },
    { id: 'completion', label: 'Conclusão' },
  ];

  const getCurrentStepIndex = () => {
    const specialSteps: Record<string, number> = {
      'facial-analysis': 3,
      'document-instructions': 4,
      'document-capture': 4,
      'document-analysis': 4,
    };

    return specialSteps[currentStep] ?? steps.findIndex(step => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${currentStepIndex >= index
                ? 'border-primary bg-primary text-white' 
                : 'border-gray-300 text-gray-500'
              }`}
            >
              {currentStepIndex > index ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="ml-4 w-16 h-0.5 bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
