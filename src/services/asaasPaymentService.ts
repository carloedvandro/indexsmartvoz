
import { useToast } from "@/hooks/use-toast";

const ASAAS_EDGE_PAYMENT_URL = "/functions/asaas-payment";

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

export const useAsaasPayment = () => {
  const { toast } = useToast();

  const iniciarCobrancaAsaas = async (
    selectedLines: Line[],
    selectedDueDate: number | null,
    acceptedTerms: boolean,
    setIsAsaasProcessing: (value: boolean) => void
  ) => {
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

  return { iniciarCobrancaAsaas };
};
