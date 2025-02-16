
import { useState } from "react";
import { 
  ActivationType, 
  DeviceSelector, 
  StepIndicator, 
  SuccessScreen,
  IMEIForm,
  EIDForm
} from "@/components/client/esim";
import { Card, CardContent } from "@/components/ui/card";
import { ESIMActivation, createESIMActivation } from "@/services/esim/esimActivationService";
import { useToast } from "@/components/ui/use-toast";

type Step = 'type' | 'device' | 'imei' | 'eid' | 'success';

export default function ESIMActivationPage() {
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [activationData, setActivationData] = useState<Partial<ESIMActivation>>({});
  const { toast } = useToast();

  const handleTypeSelect = (type: 'self' | 'collaborator') => {
    setActivationData(prev => ({ ...prev, activation_type: type }));
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
      const completeData = {
        activation_type: activationData.activation_type!,
        device_type: activationData.device_type!,
        phone_number: '+55', // Valor padrão já que não pedimos mais o número
        imei: activationData.imei,
        eid
      };
      
      const result = await createESIMActivation(completeData);
      setActivationData(prev => ({ ...prev, ...result }));
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
