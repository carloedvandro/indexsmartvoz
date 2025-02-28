
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
    <div className="w-full max-w-3xl mx-auto mt-12 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center`}>
            1
          </div>
          <div className={`flex-1 h-1 ${currentStepIndex >= 1 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
        </div>
        <div className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full ${currentStepIndex >= 1 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
            2
          </div>
          <div className={`flex-1 h-1 ${currentStepIndex >= 2 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
        </div>
        <div className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full ${currentStepIndex >= 2 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
            3
          </div>
          <div className={`flex-1 h-1 ${currentStepIndex >= 3 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
        </div>
        <div className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full ${currentStepIndex >= 3 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
            4
          </div>
          <div className={`flex-1 h-1 ${currentStepIndex >= 4 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
        </div>
        <div className={`w-8 h-8 rounded-full ${currentStepIndex >= 4 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
          5
        </div>
      </div>
    </div>
  );
}
