
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
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">Ativação do eSIM</h1>
      </div>
      
      <div className="relative flex w-full">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
          <div 
            className="h-full bg-[#8425af]"
            style={{ 
              width: `${((currentStepIndex) / (steps.length - 1)) * 100}%`,
              transition: "width 300ms ease-in-out"
            }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                    isActive ? "bg-[#8425af] text-white" : "bg-gray-200 text-gray-600",
                    isCurrent ? "ring-2 ring-offset-2 ring-[#8425af]" : ""
                  )}
                >
                  {index + 1}
                </div>
                <span 
                  className={cn(
                    "text-sm whitespace-nowrap",
                    isCurrent ? "text-[#8425af] font-medium" : isActive ? "text-[#8425af]" : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
