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
    if (!selectedLines?.length || !selectedDueDate) {
      toast({ title: "Erro", description: "Dados do plano ou vencimento ausentes.", variant: "destructive" });
      return;
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

      const data = await res.json();

      if (data.error || !data.invoiceUrl) {
        setIsAsaasProcessing(false);
        toast({ title: "Erro ao gerar cobrança", description: data.error?.message || "Erro desconhecido", variant: "destructive" });
        return;
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

      // Redirecionar para checkout Asaas imediatamente
      window.location.href = data.invoiceUrl;
    } catch (e) {
      setIsAsaasProcessing(false);
      toast({ title: "Falha na requisição de pagamento", description: "Tente novamente ou escolha outra forma.", variant: "destructive" });
    }
  };

  // Atualiza manipulação do botão de continuar do fluxo (passo 3: termos)
  const handleContinue = async () => {
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
      await iniciarCobrancaAsaas();
      // Não avança para o próximo passo ainda: só avança após confirmação no webhook
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
    </ProductsContainer>
  );
}
