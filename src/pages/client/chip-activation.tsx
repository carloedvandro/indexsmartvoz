
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { ESIMActivationFlow } from "@/components/client/esim/ChipActivationFlow";
import { ConfirmationScreen } from "@/components/client/products/chip-activation/ConfirmationScreen";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Purpose: Página principal de ativação de chip após pagamento confirmado  
 * Permite escolher entre chip físico ou eSIM e direciona para o fluxo correspondente
 */

export default function ChipActivation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'selection' | 'physical' | 'virtual'>('selection');
  const [activationData, setActivationData] = useState<any>({});
  
  // Estados específicos para fluxo de eSIM
  const [esimStep, setEsimStep] = useState(1);
  const [esimActivationData, setEsimActivationData] = useState<{
    type?: 'self' | 'collaborator';
    device_type?: 'android' | 'ios';
    imei?: string;
    eid?: string;
    internet?: string;
    ddd?: string;
    dueDate?: number;
    price?: number;
  }>({});

  // Estados específicos para fluxo de chip físico
  const [physicalChipStep, setPhysicalChipStep] = useState(4); // Começar no step 4 (guia de código de barras)
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [selectedLines, setSelectedLines] = useState<any[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  // Verificar se há dados do pedido e criar linha para ativação
  useEffect(() => {
    const orderData = localStorage.getItem('orderData');
    const selectedPlan = localStorage.getItem('selectedPlan');
    
    if (!orderData) {
      console.warn('⚠️ [CHIP-ACTIVATION] Nenhum dado de pedido encontrado');
      navigate('/client/dashboard', { replace: true });
      return;
    }

    try {
      const parsedOrderData = JSON.parse(orderData);
      let parsedPlanData = null;
      
      if (selectedPlan) {
        parsedPlanData = JSON.parse(selectedPlan);
      }
      
      console.log('📋 [CHIP-ACTIVATION] Dados do pedido carregados:', parsedOrderData);
      console.log('📋 [CHIP-ACTIVATION] Dados do plano carregados:', parsedPlanData);
      
      setActivationData(parsedOrderData);
      
      // Criar linha com os dados do plano para ativação (chip físico)
      const line = {
        id: 1,
        number: `Linha ${parsedPlanData?.title || 'Principal'}`,
        internet: parsedPlanData?.title || parsedPlanData?.name || 'Plano Selecionado',
        type: 'Chip Físico',
        ddd: '11', // DDD padrão, pode ser ajustado conforme necessário
        price: parsedPlanData?.price || parsedPlanData?.value || parsedOrderData.total,
        barcode: '',
        planId: parsedPlanData?.id,
        planName: parsedPlanData?.title || parsedPlanData?.name
      };
      
      setSelectedLines([line]);
      console.log('📱 [CHIP-ACTIVATION] Linha criada para ativação:', line);

      // Configurar dados do eSIM também
      setEsimActivationData({
        internet: parsedPlanData?.title || parsedPlanData?.name || 'Plano Selecionado',
        ddd: '11',
        dueDate: 10,
        price: parsedPlanData?.price || parsedPlanData?.value || parsedOrderData.total
      });
      
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao processar dados:', error);
      navigate('/client/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setEsimStep(1);
    setPhysicalChipStep(4);
    setScanningIndex(null);
    setShowConfirmation(false);
  };

  // Função para atualizar status do pedido
  const updateOrderStatus = async () => {
    try {
      setIsUpdatingOrder(true);
      
      const orderData = localStorage.getItem('orderData');
      if (!orderData) {
        throw new Error('Dados do pedido não encontrados');
      }

      const parsedOrderData = JSON.parse(orderData);
      
      // Atualizar status do pedido para 'chip_activation'
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'chip_activation',
          updated_at: new Date().toISOString(),
          notes: `Código de barras escaneado: ${selectedLines[0]?.barcode}`
        })
        .eq('id', parsedOrderData.id);

      if (error) {
        throw error;
      }

      // Gerar protocolo
      const protocolNumber = `CHIP-${Date.now()}`;
      setProtocol(protocolNumber);

      console.log('✅ [CHIP-ACTIVATION] Pedido atualizado com sucesso');
      
      toast({
        title: "Sucesso!",
        description: "Ativação enviada para aprovação da empresa.",
      });

      return true;
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao atualizar pedido:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar ativação. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // Handlers para eSIM
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
    setEsimActivationData({ ...esimActivationData, device_type: device });
    handleEsimContinue();
  };

  const handleTypeSelect = (type: 'self' | 'collaborator') => {
    setEsimActivationData({ ...esimActivationData, type });
    handleEsimContinue();
  };

  const handlePlanSelect = (planData: {internet: string; ddd: string; dueDate: number; price: number}) => {
    setEsimActivationData({ 
      ...esimActivationData, 
      internet: planData.internet,
      ddd: planData.ddd,
      dueDate: planData.dueDate,
      price: planData.price
    });
    handleEsimContinue();
  };

  const handleIMEISubmit = (imei: string) => {
    if (!esimActivationData.imei || esimActivationData.imei !== imei) {
      setEsimActivationData({ ...esimActivationData, imei });
    }
    handleEsimContinue();
  };

  const handleEIDSubmit = (eid: string) => {
    if (!esimActivationData.eid || esimActivationData.eid !== eid) {
      setEsimActivationData({ ...esimActivationData, eid });
    }
    handleEsimContinue();
  };

  // Handlers para chip físico
  const handlePhysicalChipBack = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
      return;
    }
    
    if (physicalChipStep === 4) {
      handleBackToSelection();
    } else {
      setPhysicalChipStep(physicalChipStep - 1);
      setScanningIndex(null);
    }
  };

  const handlePhysicalChipContinue = async () => {
    if (physicalChipStep === 4) {
      setPhysicalChipStep(5); // Ir para instruções de código de barras
    } else if (physicalChipStep === 5) {
      setPhysicalChipStep(6); // Ir para escaneamento
    } else if (physicalChipStep === 6) {
      // Verificar se todos os códigos foram escaneados
      const allBarcodesScanned = selectedLines.every(line => line.barcode && line.barcode.length > 0);
      if (allBarcodesScanned) {
        console.log('✅ [CHIP-ACTIVATION] Todos os códigos escaneados, atualizando pedido...');
        const success = await updateOrderStatus();
        if (success) {
          setShowConfirmation(true);
        }
      } else {
        console.log('⚠️ [CHIP-ACTIVATION] Nem todos os códigos foram escaneados');
        toast({
          title: "Atenção",
          description: "Por favor, escaneie o código de barras do chip antes de continuar.",
          variant: "destructive",
        });
      }
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
    
    console.log('✅ [CHIP-ACTIVATION] Linha atualizada:', updatedLines[index]);
  };

  const handleScanningClose = () => {
    setScanningIndex(null);
  };

  const handleUnderstand = () => {
    // Limpar dados do localStorage
    localStorage.removeItem('orderData');
    localStorage.removeItem('selectedPlan');
    
    // Navegar para o dashboard
    navigate('/client/dashboard', { replace: true });
  };

  // Renderizar tela de confirmação
  if (showConfirmation) {
    return (
      <ConfirmationScreen
        selectedLines={selectedLines}
        protocol={protocol}
      />
    );
  }

  // Renderizar seleção de tipo de ativação
  if (currentStep === 'selection') {
    return (
      <div className="min-h-screen bg-white">
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
          <div className="w-full max-w-md mx-auto p-4 space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">Escolha o tipo de ativação</h1>
              <p className="text-gray-600">Como você deseja ativar sua linha?</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setCurrentStep('physical')}
                className="w-full p-4 border-2 border-[#8425af] rounded-lg hover:bg-[#8425af] hover:text-white transition-colors"
              >
                <div className="text-left">
                  <h3 className="font-semibold">Chip Físico</h3>
                  <p className="text-sm opacity-75">Ativar usando chip SIM físico</p>
                </div>
              </button>

              <button
                onClick={() => setCurrentStep('virtual')}
                className="w-full p-4 border-2 border-[#8425af] rounded-lg hover:bg-[#8425af] hover:text-white transition-colors"
              >
                <div className="text-left">
                  <h3 className="font-semibold">eSIM</h3>
                  <p className="text-sm opacity-75">Ativar usando eSIM virtual</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar fluxo de chip físico
  if (currentStep === 'physical') {
    return (
      <div className="min-h-screen bg-white">
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
        
        {isUpdatingOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8425af]"></div>
                <p>Processando ativação...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Renderizar fluxo de eSIM
  if (currentStep === 'virtual') {
    return (
      <div className="min-h-screen bg-white">
        <ESIMActivationFlow
          currentStep={esimStep}
          onBack={handleEsimBack}
          onContinue={handleEsimContinue}
          onDeviceSelect={handleDeviceSelect}
          onTypeSelect={handleTypeSelect}
          onPlanSelect={handlePlanSelect}
          onIMEISubmit={handleIMEISubmit}
          onEIDSubmit={handleEIDSubmit}
          activationData={esimActivationData}
        />
      </div>
    );
  }

  return null;
}
