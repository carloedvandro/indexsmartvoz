
import { useState } from "react";
import { ESIMActivationFlow } from "@/components/client/esim/ChipActivationFlow";
import { ESIMActivation, createESIMActivation } from "@/services/esim/esimActivationService";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function ESIMActivationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activationData, setActivationData] = useState<Partial<ESIMActivation>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/client/dashboard");
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleTypeSelect = (type: 'self' | 'collaborator') => {
    setActivationData(prev => ({ ...prev, activation_type: type }));
    handleContinue();
  };

  const handleDeviceSelect = (device: 'android' | 'ios') => {
    setActivationData(prev => ({ ...prev, device_type: device }));
    handleContinue();
  };

  const handleIMEISubmit = (imei: string) => {
    setActivationData(prev => ({ ...prev, imei }));
    handleContinue();
  };

  const handleEIDSubmit = async (eid: string) => {
    try {
      const completeData = {
        activation_type: activationData.activation_type!,
        device_type: activationData.device_type!,
        phone_number: '+55',
        imei: activationData.imei,
        eid
      };
      
      const result = await createESIMActivation(completeData);
      setActivationData(prev => ({ ...prev, ...result }));
      handleContinue();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na ativação",
        description: "Não foi possível completar a ativação do eSIM. Tente novamente.",
      });
    }
  };

  return (
    <ESIMActivationFlow
      currentStep={currentStep}
      onBack={handleBack}
      onContinue={handleContinue}
      onTypeSelect={handleTypeSelect}
      onDeviceSelect={handleDeviceSelect}
      onIMEISubmit={handleIMEISubmit}
      onEIDSubmit={handleEIDSubmit}
    />
  );
}
