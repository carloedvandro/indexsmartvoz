
import { Check } from "lucide-react";

const steps = [
  { id: 'type', title: 'Tipo de Ativação' },
  { id: 'device', title: 'Dispositivo' },
  { id: 'imei', title: 'IMEI' },
  { id: 'eid', title: 'EID' },
  { id: 'success', title: 'Conclusão' },
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="p-6 border rounded-lg w-full">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                index <= currentStepIndex
                  ? 'bg-[#8425af] text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="flex-1 min-h-[40px]">
              <span
                className={`text-sm ${
                  index <= currentStepIndex ? 'text-[#8425af] font-semibold' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`h-full w-0.5 ml-[14px] mt-2 ${
                    index < currentStepIndex ? 'bg-[#8425af]' : 'bg-gray-200'
                  }`}
                  style={{ height: '24px' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
