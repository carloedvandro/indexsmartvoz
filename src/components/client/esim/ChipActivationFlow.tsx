
import { Card } from "@/components/ui/card";
import { ActivationType } from "./ActivationType";
import { DeviceSelector } from "./DeviceSelector";
import { IMEIForm } from "./IMEIForm";
import { EIDForm } from "./EIDForm";
import { SuccessScreen } from "./SuccessScreen";
import { StepIndicator } from "./StepIndicator";
import { ESIMActivation } from "@/services/esim/esimActivationService";

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
    <div className="min-h-screen bg-white">
      <div className="flex flex-col flex-1">
        <div className="py-4 px-6 text-center border-b">
          <div className="container mx-auto">
            <h1 className="text-xl font-semibold text-gray-900">ATIVAÇÃO DE ESIM</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid grid-cols-1 gap-8">
            <StepIndicator currentStep={getCurrentStepId()} />
            
            <Card className="p-8 shadow-sm border border-gray-100">
              {renderCurrentStep()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
