
import { useState } from "react";
import { ActivationType, DeviceSelector, PhoneForm, StepIndicator, SuccessScreen } from "@/components/client/esim";
import { Card, CardContent } from "@/components/ui/card";
import { ESIMActivation } from "@/services/esim/esimActivationService";

type Step = 'type' | 'phone' | 'device' | 'success';

export default function ESIMActivationPage() {
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [activationData, setActivationData] = useState<Partial<ESIMActivation>>({});

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
    setCurrentStep('success');
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
            
            {currentStep === 'success' && (
              <SuccessScreen data={activationData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
