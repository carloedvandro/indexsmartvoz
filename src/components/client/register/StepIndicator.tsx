
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const StepIndicator = ({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                index + 1 <= currentStep
                  ? 'bg-[#8425af] text-white border-[#8425af]'
                  : 'bg-white text-gray-400 border-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs mt-2 text-center ${
              index + 1 <= currentStep ? 'text-[#8425af]' : 'text-gray-400'
            }`}>
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#8425af] h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
