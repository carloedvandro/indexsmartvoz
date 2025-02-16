
const steps = [
  { id: 'type', title: 'Identidade' },
  { id: 'device', title: 'Sistema' },
  { id: 'imei', title: 'IMEI' },
  { id: 'eid', title: 'EID' }
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full relative pb-2">
      <div className="text-center mb-2">
        <h1 className="text-xl font-semibold">ATIVAÇÃO DE ESIM</h1>
      </div>
      
      <div className="relative flex justify-between w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 text-center relative">
            <span className={`text-sm ${
              index === currentStepIndex ? 'text-[#8425af] font-medium' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`absolute top-7 left-1/2 right-0 h-1 ${
                index < currentStepIndex ? 'bg-[#8425af]' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
        <div 
          className="h-full bg-[#8425af] transition-all duration-300"
          style={{ 
            width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
