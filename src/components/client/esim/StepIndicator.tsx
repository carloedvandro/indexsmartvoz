
import { Check } from "lucide-react";

const steps = [
  { id: 'type', title: 'Identidade' },
  { id: 'device', title: 'Sistema' },
  { id: 'imei', title: 'IMEI' },
  { id: 'eid', title: 'EID' }
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto relative">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center space-y-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index < currentStepIndex
                ? 'bg-[#9b87f5] text-white'
                : index === currentStepIndex
                ? 'bg-[#9b87f5] text-white'
                : 'bg-gray-200'
            }`}
          >
            {index < currentStepIndex ? (
              <Check className="w-4 h-4" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </div>
          <span className={`text-sm font-medium ${
            index === currentStepIndex ? 'text-[#9b87f5]' : 'text-gray-500'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`absolute left-[calc(${(index + 1) * 33.33}% - 3rem)] right-[calc(${(index + 1) * 33.33}% - 3rem)] h-[2px] top-3 -z-10 ${
              index < currentStepIndex ? 'bg-[#9b87f5]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
