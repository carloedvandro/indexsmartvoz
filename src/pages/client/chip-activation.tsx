
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChipTypeSelection } from "@/components/client/products/chip-activation/ChipTypeSelection";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { ESIMActivationFlow } from "@/components/client/esim/ChipActivationFlow";

/**
 * Purpose: Página principal de ativação de chip após pagamento confirmado
 * Permite escolher entre chip físico ou eSIM e direciona para o fluxo correspondente
 */

export default function ChipActivation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'selection' | 'physical' | 'virtual'>('selection');
  const [activationData, setActivationData] = useState<any>({});

  // Verificar se há dados do pedido
  useEffect(() => {
    const orderData = localStorage.getItem('orderData');
    if (!orderData) {
      console.warn('⚠️ [CHIP-ACTIVATION] Nenhum dado de pedido encontrado');
      // Redirecionar para dashboard se não há dados
      navigate('/client/dashboard', { replace: true });
      return;
    }

    try {
      const parsedData = JSON.parse(orderData);
      console.log('📋 [CHIP-ACTIVATION] Dados do pedido carregados:', parsedData);
      setActivationData(parsedData);
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao processar dados do pedido:', error);
      navigate('/client/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChipTypeSelect = (type: 'physical' | 'virtual') => {
    console.log('🔄 [CHIP-ACTIVATION] Tipo de chip selecionado:', type);
    
    // Salvar tipo selecionado
    const updatedData = { ...activationData, chipType: type };
    setActivationData(updatedData);
    localStorage.setItem('orderData', JSON.stringify(updatedData));
    
    // Ir para o fluxo correspondente
    if (type === 'physical') {
      setCurrentStep('physical');
    } else {
      setCurrentStep('virtual');
    }
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  const handleBackToDashboard = () => {
    navigate('/client/dashboard', { replace: true });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'selection':
        return (
          <ChipTypeSelection
            onSelect={handleChipTypeSelect}
            onBack={handleBackToDashboard}
          />
        );
      
      case 'physical':
        return (
          <ChipActivationFlow
            onBack={handleBackToSelection}
          />
        );
      
      case 'virtual':
        return (
          <ESIMActivationFlow
            currentStep={1}
            onBack={handleBackToSelection}
            onContinue={() => {}}
            onDeviceSelect={() => {}}
            onTypeSelect={() => {}}
            onPlanSelect={() => {}}
            onIMEISubmit={() => {}}
            onEIDSubmit={() => {}}
            activationData={activationData}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Logo fixada no topo */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>
      </div>

      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-auto p-4">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}
