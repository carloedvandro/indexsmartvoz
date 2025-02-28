
import { useState } from "react";
import { ESIMActivationFlow } from "@/components/client/esim/ChipActivationFlow";

export default function ClientESIM() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activationData, setActivationData] = useState<{
    type?: 'self' | 'collaborator';
    device_type?: 'android' | 'ios';
    imei?: string;
    eid?: string;
    internet?: string;
    ddd?: string;
    dueDate?: number;
    price?: number;
  }>({});

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleDeviceSelect = (device: 'android' | 'ios') => {
    setActivationData({ ...activationData, device_type: device });
    handleContinue();
  };

  const handleTypeSelect = (type: 'self' | 'collaborator') => {
    setActivationData({ ...activationData, type });
    handleContinue();
  };

  const handlePlanSelect = (planData: {internet: string; ddd: string; dueDate: number; price: number}) => {
    setActivationData({ 
      ...activationData, 
      internet: planData.internet,
      ddd: planData.ddd,
      dueDate: planData.dueDate,
      price: planData.price
    });
    handleContinue();
  };

  const handleIMEISubmit = (imei: string) => {
    setActivationData({ ...activationData, imei });
    handleContinue();
  };

  const handleEIDSubmit = (eid: string) => {
    setActivationData({ ...activationData, eid });
    handleContinue();
  };

  return (
    <ESIMActivationFlow
      currentStep={currentStep}
      onBack={handleBack}
      onContinue={handleContinue}
      onDeviceSelect={handleDeviceSelect}
      onTypeSelect={handleTypeSelect}
      onPlanSelect={handlePlanSelect}
      onIMEISubmit={handleIMEISubmit}
      onEIDSubmit={handleEIDSubmit}
      activationData={activationData}
    />
  );
}
