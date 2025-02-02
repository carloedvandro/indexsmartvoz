interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showChipActivation?: boolean;
}

export function ProgressBar({ currentStep, totalSteps, showChipActivation }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className={`w-6 h-6 rounded-full ${
            currentStep >= index + 1 ? 'bg-[#8425af]' : 'bg-gray-200'
          } text-white flex items-center justify-center text-sm`}>
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`flex-1 h-1 ${
              currentStep >= index + 2 ? 'bg-[#8425af]' : 'bg-gray-200'
            } mx-2`} />
          )}
        </div>
      ))}
    </div>
  );
}