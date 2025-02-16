
import { Check } from "lucide-react";

const steps = [
  { id: 'type', title: 'Identidade' },
  { id: 'device', title: 'eSIM' },
  { id: 'imei', title: 'Linhas' }
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex items-center justify-between max-w-xl mx-auto relative mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center space-y-2">
          <div
            className={`w-6 h-6 rounded-full ${
              index < currentStepIndex
                ? 'bg-[#8425af] text-white flex items-center justify-center'
                : index === currentStepIndex
                ? 'bg-[#8425af] border-2 border-white flex items-center justify-center'
                : 'bg-gray-200 flex items-center justify-center'
            }`}
          >
            {index < currentStepIndex ? (
              <Check className="w-4 h-4" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </div>
          <span className={`text-sm font-medium ${
            index === currentStepIndex ? 'text-[#8425af]' : 'text-gray-500'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`absolute left-[calc(${(index + 1) * 50}% - 2rem)] right-[calc(${(index + 1) * 50}% - 2rem)] h-[2px] top-3 -z-10 ${
              index < currentStepIndex ? 'bg-[#8425af]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
