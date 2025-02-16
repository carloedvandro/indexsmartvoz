
import { Card } from "@/components/ui/card";
import { ActivationType } from "./ActivationType";
import { DeviceSelector } from "./DeviceSelector";
import { IMEIForm } from "./IMEIForm";
import { EIDForm } from "./EIDForm";
import { SuccessScreen } from "./SuccessScreen";
import { StepIndicator } from "./StepIndicator";
import { ESIMActivation } from "@/services/esim/esimActivationService";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

type ESIMActivationFlowProps = {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  onDeviceSelect: (device: 'android' | 'ios') => void;
  onTypeSelect: (type: 'self' | 'collaborator') => void;
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
  onIMEISubmit,
  onEIDSubmit,
  activationData
}: ESIMActivationFlowProps) {
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ActivationType onSelect={onTypeSelect} onBack={onBack} />;
      case 2:
        return <DeviceSelector onSelect={onDeviceSelect} onBack={onBack} />;
      case 3:
        return (
          <IMEIForm 
            onSubmit={onIMEISubmit} 
            onBack={onBack}
            deviceType={activationData.device_type as 'android' | 'ios'} 
          />
        );
      case 4:
        return (
          <EIDForm 
            onSubmit={onEIDSubmit} 
            onBack={onBack}
            deviceType={activationData.device_type as 'android' | 'ios'} 
          />
        );
      case 5:
        return <SuccessScreen data={activationData} />;
      default:
        return null;
    }
  };

  const getCurrentStepId = () => {
    switch (currentStep) {
      case 1:
        return 'type';
      case 2:
        return 'device';
      case 3:
        return 'imei';
      case 4:
        return 'eid';
      default:
        return 'type';
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start py-12 gap-8 overflow-auto scrollbar-hide">
      <ParticlesBackground />
      <StepIndicator currentStep={getCurrentStepId()} />
      <Card className="w-[90%] max-w-sm mx-auto shadow-xl z-10">
        {renderCurrentStep()}
      </Card>
    </main>
  );
}
