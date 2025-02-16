
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StepIndicator } from "./StepIndicator";
import { DeviceSelector } from "./DeviceSelector";
import { ActivationType } from "./ActivationType";
import { IMEIForm } from "./IMEIForm";
import { EIDForm } from "./EIDForm";
import { SuccessScreen } from "./SuccessScreen";
import { ESIMActivation } from "@/services/esim/esimActivationService";
import { ArrowLeft } from "lucide-react";

interface ESIMActivationFlowProps {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  onDeviceSelect: (device: 'android' | 'ios') => void;
  onTypeSelect: (type: 'self' | 'collaborator') => void;
  onIMEISubmit: (imei: string) => void;
  onEIDSubmit: (eid: string) => void;
  activationData: Partial<ESIMActivation>;
}

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
        return <ActivationType onSelect={onTypeSelect} />;
      case 2:
        return <DeviceSelector onSelect={onDeviceSelect} />;
      case 3:
        return <IMEIForm onSubmit={onIMEISubmit} />;
      case 4:
        return <EIDForm onSubmit={onEIDSubmit} />;
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
      default:
        return 'type';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Barra superior */}
      <div className="bg-[#1A1F2C] text-white py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Saída
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">ATIVAÇÃO DE ESIM</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/20 hover:bg-white/10"
          >
            Restaurar
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4 pb-16 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <StepIndicator currentStep={getCurrentStepId()} />
          
          <Card className="p-6">
            {renderCurrentStep()}
          </Card>
        </div>
      </div>
    </div>
  );
}
