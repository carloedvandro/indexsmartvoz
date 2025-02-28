
import { cn } from "@/lib/utils";

export function StepIndicator({ currentStep }: { currentStep: string }) {
  // Convert the step ID to an index
  const stepIds = ['plan', 'type', 'device', 'imei', 'eid'];
  const currentStepIndex = stepIds.findIndex(id => id === currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-8">
      <div className="flex items-center justify-between">
        {stepIds.map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white",
                index <= currentStepIndex ? "bg-[#8425af]" : "bg-gray-200"
              )}
            >
              {index + 1}
            </div>
            {index < stepIds.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-1", 
                  index < currentStepIndex ? "bg-[#8425af]" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
