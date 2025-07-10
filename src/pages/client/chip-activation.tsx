
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";

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


  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setEsimStep(1);
    setPhysicalChipStep(4);
    setScanningIndex(null);
  };


  const handleEsimContinue = () => {
    setEsimStep(esimStep + 1);
  };

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


  return (
    <div className="min-h-screen ">
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>
      </div>

      <div className={`${currentStep === 'selection' ? 'pt-20' : ''} flex items-center justify-center min-h-screen`}>
        <div className="w-full max-w-md mx-auto p-4">
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
        </div>
      </div>
    </div>
  );
}
