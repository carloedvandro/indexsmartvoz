
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
  const [esimStep, setEsimStep] = useState(1);
  
  // Estados específicos para fluxo de chip físico
  const [physicalChipStep, setPhysicalChipStep] = useState(4); // Começar no step 4 (guia de código de barras)
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [selectedLines, setSelectedLines] = useState<any[]>([]);

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
      setPhysicalChipStep(4); // Começar no step 4 (instruções do chip)
      
      // Configurar as linhas baseado nos dados do pedido
      const lines = updatedData.selectedLines || [
        {
          id: 1,
          internet: updatedData.planName || "Plano Smart",
          type: "Mensal",
          ddd: "",
          price: updatedData.amount || 0,
        }
      ];
      setSelectedLines(lines);
    } else {
      setCurrentStep('virtual');
      setEsimStep(1); // Começar no step 1 do eSIM (seleção de dispositivo)
    }
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setEsimStep(1);
    setPhysicalChipStep(4);
    setScanningIndex(null);
  };

  const handleBackToDashboard = () => {
    navigate('/client/dashboard', { replace: true });
  };

  const handleEsimBack = () => {
    if (esimStep === 1) {
      handleBackToSelection();
    } else {
      setEsimStep(esimStep - 1);
    }
  };

  const handleEsimContinue = () => {
    setEsimStep(esimStep + 1);
  };

  const handleDeviceSelect = (device: 'android' | 'ios') => {
    setActivationData({ ...activationData, device_type: device });
    handleEsimContinue();
  };

  const handleIMEISubmit = (imei: string) => {
    setActivationData({ ...activationData, imei });
    handleEsimContinue();
  };

  const handleEIDSubmit = (eid: string) => {
    setActivationData({ ...activationData, eid });
    handleEsimContinue();
  };

  // Handlers para fluxo de chip físico
  const handlePhysicalChipBack = () => {
    if (physicalChipStep === 4) {
      handleBackToSelection();
    } else {
      setPhysicalChipStep(physicalChipStep - 1);
      setScanningIndex(null);
    }
  };

  const handlePhysicalChipContinue = () => {
    if (physicalChipStep === 4) {
      setPhysicalChipStep(5); // Ir para instruções de código de barras
    } else if (physicalChipStep === 5) {
      setPhysicalChipStep(6); // Ir para escaneamento
    } else if (physicalChipStep === 6) {
      // Finalizar ativação
      console.log('✅ [CHIP-ACTIVATION] Ativação concluída');
      navigate('/client/dashboard', { replace: true });
    }
  };

  const handleStartScanning = (index: number) => {
    console.log('📱 [CHIP-ACTIVATION] Iniciando escaneamento para linha:', index);
    setScanningIndex(index);
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    console.log('📋 [CHIP-ACTIVATION] Código escaneado:', barcode, 'para linha:', index);
    
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
    setScanningIndex(null);
    
    // Atualizar dados de ativação
    setActivationData({ ...activationData, selectedLines: updatedLines });
  };

  const handleScanningClose = () => {
    setScanningIndex(null);
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
            currentStep={physicalChipStep}
            selectedLines={selectedLines}
            scanningIndex={scanningIndex}
            onBack={handlePhysicalChipBack}
            onContinue={handlePhysicalChipContinue}
            onStartScanning={handleStartScanning}
            onUpdateBarcode={handleUpdateBarcode}
            onScanningClose={handleScanningClose}
          />
        );
      
      case 'virtual':
        return (
          <ESIMActivationFlow
            currentStep={esimStep}
            onBack={handleEsimBack}
            onContinue={handleEsimContinue}
            onDeviceSelect={handleDeviceSelect}
            onTypeSelect={() => {}} // Não usado no novo fluxo
            onPlanSelect={() => {}} // Não usado no novo fluxo
            onIMEISubmit={handleIMEISubmit}
            onEIDSubmit={handleEIDSubmit}
            activationData={activationData}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Logo fixada no topo - apenas para seleção inicial */}
      {currentStep === 'selection' && (
        <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
          <div className="flex items-center justify-center">
            <img
              src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
              alt="Smartvoz"
              className="h-16 object-contain"
            />
          </div>
        </div>
      )}

      <div className={`${currentStep === 'selection' ? 'pt-20' : ''} flex items-center justify-center min-h-screen`}>
        <div className="w-full max-w-md mx-auto p-4">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}
