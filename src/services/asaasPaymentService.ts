
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

      // Chama Edge Function via Supabase client
      const { data, error } = await supabase.functions.invoke('asaas-payment', {
        body: {
          name,
          email,
          cpfCnpj,
          phone,
          value,
          dueDate,
          webhookUrl: `${window.location.origin}/functions/asaas-webhook`
        }
      });

      console.log('📡 Resposta do Asaas:', data);

      if (error) {
        console.error('❌ Erro na Edge Function:', error);
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro no servidor", 
          description: `Erro: ${error.message}. Tente novamente.`, 
          variant: "destructive" 
        });
        return false;
      }

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
