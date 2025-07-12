import React, { useState } from 'react';
import { SelfieStep } from './steps/SelfieStep';
import { DocumentCaptureStep } from './steps/DocumentCaptureStep';
import { VerificationSuccessStep } from './steps/VerificationSuccessStep';
import { VerificationRejectedStep } from './steps/VerificationRejectedStep';

export type NewBiometryStep = 'selfie' | 'document' | 'success' | 'rejected';

interface NewFacialBiometryFlowProps {
  onComplete?: (verificationData: {
    facialVerification: boolean;
    documentVerification: boolean;
  }) => void;
  onBack: () => void;
}

export const NewFacialBiometryFlow = ({ onComplete, onBack }: NewFacialBiometryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<NewBiometryStep>('selfie');
  const [selfieImage, setSelfieImage] = useState<string>('');
  const [documentImage, setDocumentImage] = useState<string>('');
  const [verificationData, setVerificationData] = useState({
    protocol: '',
    userData: {
      name: '',
      cpf: '',
      birthDate: ''
    }
  });

  const handleSelfieCapture = (imageSrc: string) => {
    setSelfieImage(imageSrc);
    setCurrentStep('document');
  };

  const handleDocumentCapture = async (imageSrc: string) => {
    setDocumentImage(imageSrc);
    
    // Simular verificação biométrica
    try {
      // Aqui seria a integração com a API de verificação (Serasa Experian)
      const isVerified = Math.random() > 0.3; // 70% chance de sucesso para demo
      
      if (isVerified) {
        // Dados simulados que viriam da API
        setVerificationData({
          protocol: `P${Date.now()}`,
          userData: {
            name: 'João da Silva Santos',
            cpf: '123.456.789-00',
            birthDate: '15/03/1990'
          }
        });
        setCurrentStep('success');
      } else {
        setCurrentStep('rejected');
      }
    } catch (error) {
      setCurrentStep('rejected');
    }
  };

  const handleSuccess = () => {
    if (onComplete) {
      onComplete({
        facialVerification: true,
        documentVerification: true
      });
    }
  };

  const handleRetry = () => {
    // Limpar dados e reiniciar fluxo
    setSelfieImage('');
    setDocumentImage('');
    setVerificationData({
      protocol: '',
      userData: { name: '', cpf: '', birthDate: '' }
    });
    setCurrentStep('selfie');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] text-white">
      {currentStep === 'selfie' && (
        <SelfieStep 
          onCapture={handleSelfieCapture}
          onBack={onBack}
        />
      )}
      
      {currentStep === 'document' && (
        <DocumentCaptureStep 
          onCapture={handleDocumentCapture}
          onBack={() => setCurrentStep('selfie')}
        />
      )}
      
      {currentStep === 'success' && (
        <VerificationSuccessStep 
          protocol={verificationData.protocol}
          userData={verificationData.userData}
          selfieImage={selfieImage}
          onContinue={handleSuccess}
        />
      )}
      
      {currentStep === 'rejected' && (
        <VerificationRejectedStep 
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};