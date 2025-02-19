
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
      
      <div className="relative flex justify-between w-full px-32">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 text-center relative">
            <span className={`text-sm ${
              index <= currentStepIndex ? 'text-[#8425af] font-medium' : 'text-black'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
        <div className="absolute bottom-0 left-32 right-32 h-0.5 bg-[#8425af]" />
      </div>
    </div>
  );
}
