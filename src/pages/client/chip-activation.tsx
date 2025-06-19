import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ChipActivation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(4); // Start at chip instructions step
  const [selectedLines, setSelectedLines] = useState<any[]>([]);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      // Primeiro tentar carregar do localStorage
      const storedOrderData = localStorage.getItem('orderData');
      const storedPlan = localStorage.getItem('selectedPlan');
      console.log('🔍 [CHIP-ACTIVATION] Verificando orderData:', storedOrderData);
      console.log('🔍 [CHIP-ACTIVATION] Verificando selectedPlan:', storedPlan);
      
      if (storedOrderData) {
        const order = JSON.parse(storedOrderData);
        console.log('📋 [CHIP-ACTIVATION] Order do localStorage:', order);
        setOrderData(order);
        await loadOrderFromDatabase(order.orderId || order.protocol);
      } else {
        // Se não tiver no localStorage, buscar o pedido mais recente do usuário
        await loadLatestOrder();
      }
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao carregar orderData:', error);
      await loadLatestOrder();
    }
  };

  const loadOrderFromDatabase = async (orderId: string) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ [CHIP-ACTIVATION] Usuário não autenticado:', userError);
        navigate("/client/login");
        return;
      }

      // Buscar o pedido específico
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          plans(
            id,
            title,
            description,
            value
          )
        `)
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (orderError) {
        console.error('❌ [CHIP-ACTIVATION] Erro ao buscar order:', orderError);
        await loadLatestOrder();
        return;
      }

      if (order) {
        console.log('📋 [CHIP-ACTIVATION] Order encontrada no banco:', order);
        
        // Tentar obter DDD do localStorage se disponível
        let dddFromPlan = '';
        try {
          const storedPlan = localStorage.getItem('selectedPlan');
          if (storedPlan) {
            const planData = JSON.parse(storedPlan);
            dddFromPlan = planData.ddd || '';
          }
        } catch (error) {
          console.log('Erro ao obter DDD do plano salvo:', error);
        }
        
        // Criar linha baseada nos dados reais do pedido
        const line = {
          id: 1,
          internet: order.plans?.title || "Plano eSIM",
          type: "eSIM",
          ddd: dddFromPlan, // DDD do plano selecionado
          price: order.plans?.value || order.total_amount || 0,
          planId: order.plan_id,
          planName: order.plans?.title,
          orderData: order // Manter referência aos dados completos
        };
        
        setSelectedLines([line]);
        setProtocol(order.id);
        setOrderData(order);
        setLoading(false);
      } else {
        await loadLatestOrder();
      }
    } catch (error) {
      console.error('💥 [CHIP-ACTIVATION] Erro ao carregar order do banco:', error);
      await loadLatestOrder();
    }
  };

  const loadLatestOrder = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ [CHIP-ACTIVATION] Usuário não autenticado:', userError);
        toast({
          title: "Erro",
          description: "Usuário não autenticado. Redirecionando...",
          variant: "destructive"
        });
        navigate("/client/login");
        return;
      }

      console.log('👤 [CHIP-ACTIVATION] Usuário autenticado:', user.id);

      // Buscar o pedido pago mais recente
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          plans(
            id,
            title,
            description,
            value
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .limit(1);

      if (orderError) {
        console.error('❌ [CHIP-ACTIVATION] Erro ao buscar orders:', orderError);
        throw orderError;
      }

      if (orders && orders.length > 0) {
        const latestOrder = orders[0];
        console.log('📋 [CHIP-ACTIVATION] Latest order encontrada:', latestOrder);
        
        const line = {
          id: 1,
          internet: latestOrder.plans?.title || "Plano eSIM",
          type: "eSIM", 
          ddd: "",
          price: latestOrder.plans?.value || latestOrder.total_amount || 0,
          planId: latestOrder.plan_id,
          planName: latestOrder.plans?.title,
          orderData: latestOrder
        };
        
        setSelectedLines([line]);
        setProtocol(latestOrder.id);
        setOrderData(latestOrder);
        setLoading(false);
      } else {
        console.warn('⚠️ [CHIP-ACTIVATION] Nenhuma order paga encontrada');
        toast({
          title: "Erro",
          description: "Nenhum pedido encontrado. Redirecionando para produtos...",
          variant: "destructive"
        });
        navigate("/client/products");
      }
    } catch (error) {
      console.error('💥 [CHIP-ACTIVATION] Erro ao carregar latest order:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do pedido. Redirecionando...",
        variant: "destructive"
      });
      navigate("/client/products");
    }
  };

  const createOrderRecord = async (barcodes: string[]) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        throw new Error('Usuário não autenticado');
      }

      console.log('💾 [CHIP-ACTIVATION] Salvando códigos escaneados:', barcodes);
      console.log('💾 [CHIP-ACTIVATION] Protocol usado:', protocol);
      
      // Preparar notas com os códigos escaneados e DDD
      const lineWithBarcode = selectedLines[0];
      const notesText = `${lineWithBarcode?.planName || 'Plano eSIM'} - DDD: ${lineWithBarcode?.ddd || 'Não informado'} - Códigos escaneados: ${barcodes.join(', ')} - Ativação solicitada em ${new Date().toISOString()}`;
      
      // Atualizar o pedido existente
      console.log('📝 [CHIP-ACTIVATION] Atualizando order:', protocol);
      
      const { data: updatedOrder, error: updateError } = await supabase
        .from('orders')
        .update({
          notes: notesText,
          status: 'chip_activation'
        })
        .eq('id', protocol)
        .select()
        .single();

      if (updateError) {
        console.error('❌ [CHIP-ACTIVATION] Erro ao atualizar order:', updateError);
        throw updateError;
      }

      console.log('✅ [CHIP-ACTIVATION] Order atualizada com códigos:', updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao processar:', error);
      toast({
        title: "Erro ao processar solicitação",
        description: error instanceof Error ? error.message : "Erro desconhecido. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleContinue = async () => {
    console.log('🔄 [CHIP-ACTIVATION] handleContinue - currentStep:', currentStep);
    console.log('📋 [CHIP-ACTIVATION] selectedLines:', selectedLines);

    try {
      if (currentStep === 4) {
        setCurrentStep(5);
      } else if (currentStep === 5) {
        setCurrentStep(6);
      } else if (currentStep === 6) {
        // Verificar se todos os códigos foram escaneados
        const allBarcodesScanned = selectedLines.every(line => line.barcode && line.barcode.length > 0);
        
        console.log('🔍 [CHIP-ACTIVATION] Verificando códigos escaneados:', {
          selectedLines,
          allBarcodesScanned,
          barcodes: selectedLines.map(line => line.barcode)
        });

        if (!allBarcodesScanned) {
          toast({
            title: "Atenção",
            description: "Por favor, escaneie o código de barras antes de continuar.",
            variant: "destructive"
          });
          return;
        }

        const barcodes = selectedLines.map(line => line.barcode).filter(Boolean);
        console.log('📄 [CHIP-ACTIVATION] Processando códigos:', barcodes);
        
        // Atualizar o pedido com códigos escaneados
        await createOrderRecord(barcodes);
        
        toast({
          title: "Sucesso!",
          description: "Solicitação de ativação enviada para processamento.",
          variant: "default"
        });

        console.log('✅ [CHIP-ACTIVATION] Mostrando tela de confirmação');
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro no handleContinue:', error);
      // Error toast is already shown in createOrderRecord
    }
  };

  const handleBack = () => {
    if (currentStep === 4) {
      navigate("/client/payment-return");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUnderstand = () => {
    // Clear order data and navigate to dashboard
    localStorage.removeItem('orderData');
    navigate("/client/dashboard");
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    console.log('📱 [CHIP-ACTIVATION] Atualizando código:', { index, barcode });
    
    const updatedLines = [...selectedLines];
    updatedLines[index] = {
      ...updatedLines[index],
      barcode
    };
    setSelectedLines(updatedLines);
    
    console.log('✅ [CHIP-ACTIVATION] Código atualizado:', updatedLines[index]);
  };

  const handleUpdateDDD = (index: number, ddd: string) => {
    console.log('📱 [CHIP-ACTIVATION] Atualizando DDD:', { index, ddd });
    
    const updatedLines = [...selectedLines];
    updatedLines[index] = {
      ...updatedLines[index],
      ddd
    };
    setSelectedLines(updatedLines);
    
    console.log('✅ [CHIP-ACTIVATION] DDD atualizado:', updatedLines[index]);
  };

  // Show loading while data is being loaded
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do pedido...</p>
        </div>
      </div>
    );
  }

  // Show success screen if confirmation is active
  if (showConfirmation) {
    return <SuccessScreen selectedLines={selectedLines} protocol={protocol} onUnderstand={handleUnderstand} showBarcodes={true} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ChipActivationFlow 
        currentStep={currentStep} 
        selectedLines={selectedLines} 
        scanningIndex={scanningIndex} 
        onBack={handleBack} 
        onContinue={handleContinue} 
        onStartScanning={index => setScanningIndex(index)} 
        onUpdateBarcode={handleUpdateBarcode} 
        onScanningClose={() => setScanningIndex(null)}
        onUpdateDDD={handleUpdateDDD}
      />
    </div>
  );
}
