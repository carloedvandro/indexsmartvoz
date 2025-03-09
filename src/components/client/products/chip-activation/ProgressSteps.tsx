
interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-[#8425af] text-white flex items-center justify-center">
          1
        </div>
        <div className="flex-1 h-1 bg-[#8425af] mx-2" />
      </div>
      <div className="flex items-center flex-1">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
          2
        </div>
        <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-[#8425af]' : 'bg-gray-200'} mx-2`} />
      </div>
      <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-[#8425af]' : 'bg-gray-200'} text-white flex items-center justify-center`}>
        3
      </div>
    </div>
  );
}
