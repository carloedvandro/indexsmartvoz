
import { Check } from "lucide-react";

interface StepsProps {
  currentStep: string;
}

export const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    { id: 'instructions', label: 'Instruções' },
    { id: 'facial-capture', label: 'Biometria Facial' },
    { id: 'document-upload', label: 'Documentos' },
    { id: 'document-verification', label: 'Verificação' },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${currentStep === step.id 
                ? 'border-primary bg-primary text-white' 
                : steps.indexOf({ id: currentStep, label: '' }) > index 
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 text-gray-500'
              }`}
            >
              {steps.indexOf({ id: currentStep, label: '' }) > index ? (
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
