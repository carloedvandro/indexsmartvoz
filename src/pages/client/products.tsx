
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChipActivationFlow } from "@/components/client/products/ChipActivationFlow";
import { SuccessScreen } from "@/components/client/products/SuccessScreen";
import { ProductsHeader } from "@/components/client/products/ProductsHeader";
import { ProductsContainer } from "@/components/client/products/ProductsContainer";
import { MainContent } from "@/components/client/products/MainContent";

const ASAAS_EDGE_PAYMENT_URL = "/functions/asaas-payment"; // Edge Function

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
};

export default function ClientProducts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [showChipActivation, setShowChipActivation] = useState(false);
  const [isAsaasProcessing, setIsAsaasProcessing] = useState(false);

  // Load selected plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        console.log('Loaded plan from localStorage:', plan);
        
        // Pre-populate with selected plan
        setSelectedLines([{
          id: 1,
          internet: plan.gb,
          type: "eSIM",
          ddd: "",
          price: plan.price,
          planId: plan.id,
          planName: plan.name || plan.title
        }]);
      } catch (error) {
        console.error('Error parsing saved plan:', error);
        // If no plan is saved, redirect back to plan selection
        navigate("/client/plan-selection");
      }
    } else {
      navigate("/client/plan-selection");
    }
  }, [navigate]);

  // Nova função: dispara integração Asaas, cadastra cliente/cobrança, redireciona para pagamento
  const iniciarCobrancaAsaas = async () => {
    console.log('🚀 Iniciando cobrança Asaas...');
    console.log('selectedLines:', selectedLines);
    console.log('selectedDueDate:', selectedDueDate);
    console.log('acceptedTerms:', acceptedTerms);

    if (!selectedLines?.length || !selectedDueDate) {
      console.error('❌ Dados incompletos para pagamento');
      toast({ 
        title: "Erro", 
        description: "Dados do plano ou vencimento ausentes.", 
        variant: "destructive" 
      });
      return false;
    }

    setIsAsaasProcessing(true);

    try {
      // Dados do cliente (pode refinar para pegar do perfil real do usuário autenticado)
      const name = localStorage.getItem("checkoutName") || "Cliente";
      const email = localStorage.getItem("checkoutEmail") || "cliente@placeholder.com";
      const cpfCnpj = localStorage.getItem("checkoutCpf") || "";
      const phone = localStorage.getItem("checkoutPhone") || "";

      const plan = selectedLines[0];
      const value = plan.price;
      const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

      console.log('💰 Dados do pagamento:', { name, email, value, dueDate });

      // Chama Edge Function via fetch
      const res = await fetch(ASAAS_EDGE_PAYMENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          cpfCnpj,
          phone,
          value,
          dueDate,
          webhookUrl: `${window.location.origin}/functions/asaas-webhook`
        }),
      });

      console.log('📡 Status da resposta:', res.status, res.statusText);

      // Verificar se a resposta é válida antes de tentar fazer parse
      if (!res.ok) {
        console.error('❌ Erro na resposta do servidor:', res.status, res.statusText);
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro no servidor", 
          description: `Código de erro: ${res.status}. Tente novamente.`, 
          variant: "destructive" 
        });
        return false;
      }

      const textResponse = await res.text();
      console.log('📡 Resposta raw do servidor:', textResponse);

      if (!textResponse.trim()) {
        console.error('❌ Resposta vazia do servidor');
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro no servidor", 
          description: "Resposta vazia do servidor. Tente novamente.", 
          variant: "destructive" 
        });
        return false;
      }

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error('❌ Erro ao fazer parse da resposta:', parseError);
        console.error('❌ Resposta que causou erro:', textResponse);
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro de comunicação", 
          description: "Resposta inválida do servidor. Tente novamente.", 
          variant: "destructive" 
        });
        return false;
      }

      console.log('📡 Resposta do Asaas parseada:', data);

      if (data.error || !data.invoiceUrl) {
        console.error('❌ Erro na resposta do Asaas:', data.error);
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro ao gerar cobrança", 
          description: data.error?.message || "Erro desconhecido", 
          variant: "destructive" 
        });
        return false;
      }

      // Armazena referência local do pedido para pós-processamento/webhook
      localStorage.setItem('asaasPaymentSession', JSON.stringify({
        customerId: data.customerId,
        paymentId: data.paymentId,
        invoiceUrl: data.invoiceUrl,
        plan,
        dueDate,
        acceptedTerms,
        selectedLines,
        selectedDueDate,
      }));

      console.log('✅ Redirecionando para checkout Asaas:', data.invoiceUrl);

      // Redirecionar para checkout Asaas imediatamente
      window.location.href = data.invoiceUrl;
      return true;
    } catch (e) {
      console.error('💥 Erro na requisição de pagamento:', e);
      setIsAsaasProcessing(false);
      toast({ 
        title: "Falha na requisição de pagamento", 
        description: "Tente novamente ou escolha outra forma.", 
        variant: "destructive" 
      });
      return false;
    }
  };

  // Atualiza manipulação do botão de continuar do fluxo
  const handleContinue = async () => {
    console.log('🔄 handleContinue chamado - currentStep:', currentStep);
    console.log('acceptedTerms:', acceptedTerms);

    if (currentStep === 1 && selectedLines.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma linha para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 1 && (!selectedLines[0]?.ddd || !selectedDueDate)) {
      toast({
        title: "Erro",
        description: "Selecione o DDD e data de vencimento para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 3 && !acceptedTerms) {
      toast({
        title: "Erro",
        description: "Você precisa aceitar os termos para continuar",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 3 && acceptedTerms) {
      console.log('✅ Termos aceitos, iniciando pagamento...');
      const success = await iniciarCobrancaAsaas();
      if (!success) {
        console.log('❌ Falha no pagamento, permanecendo na mesma tela');
      }
      // Não avança para o próximo passo: só avança após confirmação no webhook
      return;
    }

    if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/client/plan-selection");
    } else if (currentStep > 1) {
      if (currentStep === 5) {
        setShowChipActivation(false);
        setCurrentStep(3);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleUnderstand = () => {
    navigate("/client/dashboard");
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
  };

  if (showConfirmation) {
    return (
      <SuccessScreen
        selectedLines={selectedLines}
        protocol={protocol}
        onUnderstand={handleUnderstand}
        showBarcodes={true}
      />
    );
  }

  console.log('🖥️ Renderizando produtos - currentStep:', currentStep, 'isAsaasProcessing:', isAsaasProcessing);

  return (
    <ProductsContainer>
      <ProductsHeader />

      {showChipActivation ? (
        <ChipActivationFlow
          currentStep={currentStep}
          selectedLines={selectedLines}
          scanningIndex={scanningIndex}
          onBack={handleBack}
          onContinue={handleContinue}
          onStartScanning={(index) => setScanningIndex(index)}
          onUpdateBarcode={handleUpdateBarcode}
          onScanningClose={() => setScanningIndex(null)}
        />
      ) : (
        <MainContent
          currentStep={currentStep}
          selectedLines={selectedLines}
          selectedDueDate={selectedDueDate}
          acceptedTerms={acceptedTerms}
          setSelectedLines={setSelectedLines}
          setSelectedDueDate={setSelectedDueDate}
          setAcceptedTerms={setAcceptedTerms}
          handleBack={handleBack}
          handleContinue={handleContinue}
        />
      )}
      
      {isAsaasProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#8425af]"></div>
              <span>Processando pagamento...</span>
            </div>
          </div>
        </div>
      )}
    </ProductsContainer>
  );
}
