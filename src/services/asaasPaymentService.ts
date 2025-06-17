
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
    console.log('🚀 [ASAAS-SERVICE] Iniciando cobrança Asaas...');
    console.log('📋 [ASAAS-SERVICE] selectedLines:', selectedLines);
    console.log('📋 [ASAAS-SERVICE] selectedDueDate:', selectedDueDate);
    console.log('📋 [ASAAS-SERVICE] acceptedTerms:', acceptedTerms);

    if (!selectedLines?.length || !selectedDueDate) {
      console.error('❌ [ASAAS-SERVICE] Dados incompletos para pagamento');
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

      console.log('💰 [ASAAS-SERVICE] Dados do pagamento:', { 
        name, 
        email, 
        value, 
        dueDate,
        hasCpf: !!cpfCnpj,
        hasPhone: !!phone
      });

      console.log('📡 [ASAAS-SERVICE] Chamando Edge Function...');

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

      console.log('📡 [ASAAS-SERVICE] Resposta do Edge Function:', {
        hasData: !!data,
        hasError: !!error,
        errorDetails: error
      });

      if (error) {
        console.error('❌ [ASAAS-SERVICE] Erro na Edge Function:', error);
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro no servidor", 
          description: `Erro: ${error.message}. Tente novamente.`, 
          variant: "destructive" 
        });
        return false;
      }

      console.log('📡 [ASAAS-SERVICE] Dados retornados:', data);

      if (data?.error || !data?.invoiceUrl) {
        console.error('❌ [ASAAS-SERVICE] Erro na resposta do Asaas:', data?.error);
        setIsAsaasProcessing(false);
        toast({ 
          title: "Erro ao gerar cobrança", 
          description: data?.error?.message || "Erro desconhecido", 
          variant: "destructive" 
        });
        return false;
      }

      // Armazena referência local do pedido para pós-processamento/webhook
      const sessionData = {
        customerId: data.customerId,
        paymentId: data.paymentId,
        invoiceUrl: data.invoiceUrl,
        plan,
        dueDate,
        acceptedTerms,
        selectedLines,
        selectedDueDate,
      };

      localStorage.setItem('asaasPaymentSession', JSON.stringify(sessionData));
      console.log('💾 [ASAAS-SERVICE] Dados da sessão salvos no localStorage');

      console.log('✅ [ASAAS-SERVICE] Redirecionando para checkout Asaas:', data.invoiceUrl);

      // Redirecionar para checkout Asaas imediatamente
      window.location.href = data.invoiceUrl;
      return true;
    } catch (e) {
      console.error('💥 [ASAAS-SERVICE] Erro na requisição de pagamento:', e);
      console.error('💥 [ASAAS-SERVICE] Tipo do erro:', typeof e);
      console.error('💥 [ASAAS-SERVICE] Nome do erro:', e instanceof Error ? e.name : 'N/A');
      console.error('💥 [ASAAS-SERVICE] Stack trace:', e instanceof Error ? e.stack : 'N/A');
      
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
