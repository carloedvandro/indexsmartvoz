
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
    iccid?: string;
    internet?: string;
    ddd?: string;
    dueDate?: number;
    price?: number;
    phone_number?: string;
    protocol_id?: string;
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
    // Generate ICCID from EID (using last 19 digits of EID)
    const iccid = eid.length >= 19 ? eid.slice(-19) : eid;
    
    // Generate a unique protocol ID
    const protocol_id = `PROT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Generate phone number based on DDD
    const ddd = activationData.ddd || '11';
    const phone_number = `${ddd}9${Math.floor(10000000 + Math.random() * 90000000)}`;
    
    // Verificar se o EID já não foi definido ou se mudou
    if (!activationData.eid || activationData.eid !== eid) {
      setActivationData({ 
        ...activationData, 
        eid,
        iccid,
        protocol_id,
        phone_number
      });
    }
    handleContinue();
  };

  return (
    <div className="min-h-screen bg-white">
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
    </div>
  );
}
