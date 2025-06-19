
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    // Load order data from localStorage
    try {
      const orderData = localStorage.getItem('orderData');
      console.log('🔍 [CHIP-ACTIVATION] Verificando orderData:', orderData);
      
      if (orderData) {
        const order = JSON.parse(orderData);
        console.log('📋 [CHIP-ACTIVATION] Order carregada:', order);
        
        // Set the lines data
        if (order.selectedLines && Array.isArray(order.selectedLines)) {
          setSelectedLines(order.selectedLines);
        } else {
          // Create a default line based on the order data
          const defaultLine = {
            id: 1,
            internet: order.planName || "Plano eSIM",
            type: "eSIM",
            ddd: "",
            price: order.total || 0,
            planId: order.planId,
            planName: order.planName
          };
          setSelectedLines([defaultLine]);
        }
        
        setProtocol(order.protocol || order.orderId || new Date().getTime().toString());
        setLoading(false);
      } else {
        console.warn('⚠️ [CHIP-ACTIVATION] Nenhum orderData encontrado');
        // Try to get data from the current user's latest order
        loadLatestOrder();
      }
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao carregar orderData:', error);
      loadLatestOrder();
    }
  }, []);

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

      // Get the latest paid order for this user
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*, plans(title)')
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
        
        const defaultLine = {
          id: 1,
          internet: latestOrder.plans?.title || "Plano eSIM",
          type: "eSIM", 
          ddd: "",
          price: latestOrder.total_amount || 0,
          planId: latestOrder.plan_id,
          planName: latestOrder.plans?.title
        };
        
        setSelectedLines([defaultLine]);
        setProtocol(latestOrder.id);
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
      
      // Update the existing order with scanned barcodes
      const { data: order, error } = await supabase
        .from('orders')
        .update({
          notes: `${selectedLines[0]?.planName || 'Plano eSIM'} - Códigos escaneados: ${barcodes.join(', ')} - Ativação solicitada em ${new Date().toISOString()}`
        })
        .eq('id', protocol)
        .select()
        .single();

      if (error) {
        console.error('❌ [CHIP-ACTIVATION] Erro ao atualizar order:', error);
        // Se não conseguir atualizar a order existente, criar uma nova entrada
        const newOrderData = {
          user_id: session.session.user.id,
          plan_id: selectedLines[0]?.planId || null,
          status: 'chip_activation_requested',
          total_amount: selectedLines[0]?.price || 0,
          notes: `${selectedLines[0]?.planName || 'Plano eSIM'} - Códigos escaneados: ${barcodes.join(', ')} - Ativação solicitada em ${new Date().toISOString()}`,
          payment_method: 'chip_activation'
        };

        const { data: newOrder, error: newOrderError } = await supabase
          .from('orders')
          .insert(newOrderData)
          .select()
          .single();

        if (newOrderError) throw newOrderError;
        
        console.log('✅ [CHIP-ACTIVATION] Nova order criada:', newOrder);
        return newOrder;
      }

      console.log('✅ [CHIP-ACTIVATION] Order atualizada com códigos:', order);
      return order;
    } catch (error) {
      console.error('❌ [CHIP-ACTIVATION] Erro ao processar:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar solicitação. Tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleContinue = async () => {
    console.log('🔄 [CHIP-ACTIVATION] handleContinue - currentStep:', currentStep);
    console.log('📋 [CHIP-ACTIVATION] selectedLines:', selectedLines);

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

      try {
        const barcodes = selectedLines.map(line => line.barcode).filter(Boolean);
        console.log('📄 [CHIP-ACTIVATION] Processando códigos:', barcodes);
        
        // Update the order with scanned barcodes
        await createOrderRecord(barcodes);
        
        toast({
          title: "Sucesso!",
          description: "Solicitação de ativação enviada para processamento.",
          variant: "default"
        });

        console.log('✅ [CHIP-ACTIVATION] Mostrando tela de confirmação');
        setShowConfirmation(true);
      } catch (error) {
        console.error('❌ [CHIP-ACTIVATION] Erro ao processar ativação:', error);
      }
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
      />
    </div>
  );
}
