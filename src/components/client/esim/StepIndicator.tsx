
const steps = [
  { id: 'type', title: 'Identidade' },
  { id: 'device', title: 'Sistema' },
  { id: 'imei', title: 'IMEI' },
  { id: 'eid', title: 'EID' }
];

export function StepIndicator({ currentStep }: { currentStep: string }) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full relative pb-2 pt-8">
      <div className="text-center mb-2 h-12 flex items-center justify-center">
        <h1 className="text-xl font-semibold -translate-y-6">Ativação do eSIM</h1>
      </div>
      
      <div className="relative flex w-full px-24 justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 text-center relative">
            <span className={`text-sm ${
              index === currentStepIndex ? 'text-[#8425af] font-medium' : 'text-black'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`absolute top-7 left-0 right-0 h-1 ${
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
