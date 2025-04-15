
import { ActivationType } from "./ActivationType";
import { DeviceSelector } from "./DeviceSelector";
import { IMEIForm } from "./IMEIForm";
import { EIDForm } from "./EIDForm";
import { SuccessScreen } from "./SuccessScreen";
import { StepIndicator } from "./StepIndicator";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { ESIMActivation } from "@/services/esim/esimActivationService";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

type ESIMActivationFlowProps = {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  onDeviceSelect: (device: 'android' | 'ios') => void;
  onTypeSelect: (type: 'self' | 'collaborator') => void;
  onPlanSelect: (planData: {internet: string; ddd: string; dueDate: number; price: number}) => void;
  onIMEISubmit: (imei: string) => void;
  onEIDSubmit: (eid: string) => void;
  activationData: Partial<ESIMActivation>;
};

export function ESIMActivationFlow({
  currentStep,
  onBack,
  onContinue,
  onDeviceSelect,
  onTypeSelect,
  onPlanSelect,
  onIMEISubmit,
  onEIDSubmit,
  activationData
}: ESIMActivationFlowProps) {
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PlanSelectionStep onBack={onBack} onContinue={onPlanSelect} />;
      case 2:
        return <ActivationType onSelect={onTypeSelect} onBack={onBack} />;
      case 3:
        return <DeviceSelector onSelect={onDeviceSelect} onBack={onBack} />;
      case 4:
        return (
          <IMEIForm 
            onSubmit={onIMEISubmit} 
            onBack={onBack}
            deviceType={activationData.device_type as 'android' | 'ios'} 
          />
        );
      case 5:
        return (
          <EIDForm 
            onSubmit={onEIDSubmit} 
            onBack={onBack}
            deviceType={activationData.device_type as 'android' | 'ios'} 
          />
        );
      case 6:
        return <SuccessScreen data={activationData} />;
      default:
        return null;
    }
  };

  const getCurrentStepId = () => {
    switch (currentStep) {
      case 1:
        return 'plan';
      case 2:
        return 'type';
      case 3:
        return 'device';
      case 4:
        return 'imei';
      case 5:
        return 'eid';
      default:
        return 'plan';
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start pt-20 gap-12 overflow-hidden scrollbar-hide">
      <ParticlesBackground />
      <StepIndicator currentStep={getCurrentStepId()} />
      {renderCurrentStep()}
    </main>
  );
}
