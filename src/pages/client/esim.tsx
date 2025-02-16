
import { useState } from "react";
import { 
  ActivationType, 
  DeviceSelector, 
  PhoneForm, 
  StepIndicator, 
  SuccessScreen,
  IMEIForm,
  EIDForm
} from "@/components/client/esim";
import { Card, CardContent } from "@/components/ui/card";
import { ESIMActivation, createESIMActivation } from "@/services/esim/esimActivationService";
import { useToast } from "@/components/ui/use-toast";

type Step = 'type' | 'phone' | 'device' | 'imei' | 'eid' | 'success';

export default function ESIMActivationPage() {
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [activationData, setActivationData] = useState<Partial<ESIMActivation>>({});
  const { toast } = useToast();

  const handleTypeSelect = (type: 'self' | 'collaborator') => {
    setActivationData(prev => ({ ...prev, activation_type: type }));
    setCurrentStep('phone');
  };

  const handlePhoneSubmit = (phone: string) => {
    setActivationData(prev => ({ ...prev, phone_number: phone }));
    setCurrentStep('device');
  };

  const handleDeviceSelect = (device: 'android' | 'ios') => {
    setActivationData(prev => ({ ...prev, device_type: device }));
    setCurrentStep('imei');
  };

  const handleIMEISubmit = (imei: string) => {
    setActivationData(prev => ({ ...prev, imei }));
    setCurrentStep('eid');
  };

  const handleEIDSubmit = async (eid: string) => {
    try {
      const completeData = { ...activationData, eid } as Omit<ESIMActivation, 'id' | 'user_id' | 'status' | 'help_instructions'>;
      const result = await createESIMActivation(completeData);
      setActivationData(result);
      setCurrentStep('success');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na ativação",
        description: "Não foi possível completar a ativação do eSIM. Tente novamente.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Card>
          <CardContent className="p-6">
            <StepIndicator currentStep={currentStep} />
            
            {currentStep === 'type' && (
              <ActivationType onSelect={handleTypeSelect} />
            )}
            
            {currentStep === 'phone' && (
              <PhoneForm onSubmit={handlePhoneSubmit} />
            )}
            
            {currentStep === 'device' && (
              <DeviceSelector onSelect={handleDeviceSelect} />
            )}

            {currentStep === 'imei' && (
              <IMEIForm 
                onSubmit={handleIMEISubmit}
                instructions={activationData.help_instructions?.imei}
              />
            )}

            {currentStep === 'eid' && (
              <EIDForm 
                onSubmit={handleEIDSubmit}
                instructions={activationData.help_instructions?.eid}
              />
            )}
            
            {currentStep === 'success' && (
              <SuccessScreen data={activationData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
