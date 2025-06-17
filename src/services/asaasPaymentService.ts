
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
      // Buscar dados reais do usuário autenticado
      console.log('👤 [ASAAS-SERVICE] Buscando dados do usuário autenticado...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ [ASAAS-SERVICE] Usuário não autenticado:', userError);
        toast({ 
          title: "Erro", 
          description: "Usuário não autenticado. Faça login novamente.", 
          variant: "destructive" 
        });
        setIsAsaasProcessing(false);
        return false;
      }

      // Buscar perfil completo do usuário
      console.log('📋 [ASAAS-SERVICE] Buscando perfil completo do usuário:', user.id);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('❌ [ASAAS-SERVICE] Erro ao buscar perfil:', profileError);
        toast({ 
          title: "Erro", 
          description: "Erro ao buscar dados do usuário.", 
          variant: "destructive" 
        });
        setIsAsaasProcessing(false);
        return false;
      }

      // Montar dados completos do cliente
      const clientData = {
        name: profile?.full_name || user.user_metadata?.full_name || "Cliente",
        email: profile?.email || user.email || "cliente@placeholder.com",
        cpfCnpj: profile?.cpf || profile?.cnpj || "",
        phone: profile?.mobile || profile?.phone || "",
        // Dados adicionais do perfil
        address: profile?.address || "",
        city: profile?.city || "",
        state: profile?.state || "",
        zipCode: profile?.zip_code || "",
        birthDate: profile?.birth_date || "",
        whatsapp: profile?.whatsapp || ""
      };

      console.log('👤 [ASAAS-SERVICE] Dados completos do cliente:', {
        name: clientData.name,
        email: clientData.email,
        hasCpf: !!clientData.cpfCnpj,
        hasPhone: !!clientData.phone,
        hasAddress: !!clientData.address,
        hasWhatsapp: !!clientData.whatsapp
      });

      const plan = selectedLines[0];
      const value = plan.price;
      const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

      console.log('💰 [ASAAS-SERVICE] Dados do pagamento:', { 
        planName: plan.internet,
        planType: plan.type,
        value, 
        dueDate
      });

      console.log('📡 [ASAAS-SERVICE] Chamando Edge Function com dados completos...');

      // Chama Edge Function via Supabase client com dados completos
      const { data, error } = await supabase.functions.invoke('asaas-payment', {
        body: {
          // Dados do cliente
          name: clientData.name,
          email: clientData.email,
          cpfCnpj: clientData.cpfCnpj,
          phone: clientData.phone,
          // Dados de endereço
          address: clientData.address,
          city: clientData.city,
          state: clientData.state,
          zipCode: clientData.zipCode,
          // Dados pessoais adicionais
          birthDate: clientData.birthDate,
          whatsapp: clientData.whatsapp,
          // Dados do pagamento
          value,
          dueDate,
          // Dados do plano
          planName: plan.internet,
          planType: plan.type,
          planDdd: plan.ddd,
          // Configuração
          webhookUrl: `${window.location.origin}/functions/asaas-webhook`,
          // Metadados para referência
          userId: user.id,
          selectedDueDate: selectedDueDate
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
        clientData,
        userId: user.id
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
