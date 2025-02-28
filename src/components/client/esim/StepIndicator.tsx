
import { cn } from "@/lib/utils";

const steps = [
  { id: 'plan', title: 'Plano' },
  { id: 'type', title: 'Identidade' },
  { id: 'device', title: 'Sistema' },
  { id: 'imei', title: 'IMEI' },
  { id: 'eid', title: 'EID' }
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">Ativação do eSIM</h1>
      </div>
      
      <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                index <= currentStepIndex ? 'bg-[#8425af] text-white' : 'bg-gray-200 text-gray-600'
              )}
            >
              {index + 1}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-1 mx-2",
                  index < currentStepIndex ? 'bg-[#8425af]' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
