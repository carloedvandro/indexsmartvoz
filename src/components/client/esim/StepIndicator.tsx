
import { Check } from "lucide-react";

const steps = [
  { id: 'type', title: 'Tipo de Ativação' },
  { id: 'phone', title: 'Número' },
  { id: 'device', title: 'Dispositivo' },
  { id: 'imei', title: 'IMEI' },
  { id: 'eid', title: 'EID' },
  { id: 'success', title: 'Conclusão' },
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex items-center justify-center mb-8 flex-wrap gap-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStepIndex
                  ? 'bg-[#5f0889] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="text-sm mt-2">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 mx-2 ${
                index < currentStepIndex ? 'bg-[#5f0889]' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
