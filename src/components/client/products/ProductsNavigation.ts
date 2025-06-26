
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAsaasPayment } from "@/services/asaasPaymentService";

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

interface UseProductsNavigationProps {
  currentStep: number;
  selectedLines: Line[];
  selectedDueDate: number | null;
  acceptedTerms: boolean;
  setCurrentStep: (step: number) => void;
  setShowConfirmation: (show: boolean) => void;
  setShowChipActivation: (show: boolean) => void;
  setIsAsaasProcessing: (processing: boolean) => void;
}

export function useProductsNavigation({
  currentStep,
  selectedLines,
  selectedDueDate,
  acceptedTerms,
  setCurrentStep,
  setShowConfirmation,
  setShowChipActivation,
  setIsAsaasProcessing
}: UseProductsNavigationProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { iniciarCobrancaAsaas } = useAsaasPayment();

  const handleContinue = async () => {
    console.log('🔄 handleContinue chamado - currentStep:', currentStep);
    console.log('selectedLines:', selectedLines);
    console.log('acceptedTerms:', acceptedTerms);

    // Validações por step
    if (currentStep === 1) {
      if (selectedLines.length === 0) {
        toast({
          title: "Erro",
          description: "Selecione pelo menos uma linha para continuar",
          variant: "destructive",
        });
        return;
      }

      if (!selectedLines[0]?.ddd || !selectedDueDate) {
        toast({
          title: "Erro",
          description: "Selecione o DDD e data de vencimento para continuar",
          variant: "destructive",
        });
        return;
      }

      // Avançar para step 2
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      // Avançar para step 3 (termos)
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!acceptedTerms) {
        toast({
          title: "Erro",
          description: "Você precisa aceitar os termos para continuar",
          variant: "destructive",
        });
        return;
      }

      console.log('✅ Termos aceitos, iniciando pagamento...');
      const success = await iniciarCobrancaAsaas(
        selectedLines,
        selectedDueDate,
        acceptedTerms,
        setIsAsaasProcessing
      );
      
      if (!success) {
        console.log('❌ Falha no pagamento, permanecendo na mesma tela');
        return;
      }
      
      // Se o pagamento foi bem sucedido, continua o fluxo
      return;
    }

    // Para outros steps, avançar normalmente
    if (currentStep === 4) {
      setShowChipActivation(true);
      setCurrentStep(5);
    } else if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log('🔄 handleBack chamado - currentStep:', currentStep);
    
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

  return {
    handleContinue,
    handleBack,
    handleUnderstand
  };
}
