
import { useState } from "react";
import { ESIMActivationFlow } from "@/components/client/esim/ChipActivationFlow";
import { useNavigate } from "react-router-dom";

export default function ClientESIM() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
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
    // If on first step, go back to dashboard
    if (currentStep === 1) {
      navigate("/client/dashboard");
    } else {
      // Otherwise go to previous step
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
    // Verificar se o IMEI já não foi definido ou se mudou
    if (!activationData.imei || activationData.imei !== imei) {
      setActivationData({ ...activationData, imei });
    }
    handleContinue();
  };

  const handleEIDSubmit = (eid: string) => {
    // Verificar se o EID já não foi definido ou se mudou
    if (!activationData.eid || activationData.eid !== eid) {
      setActivationData({ ...activationData, eid });
    }
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
