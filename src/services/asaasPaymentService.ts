
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  planId?: string;
  planName?: string;
};

export const useAsaasPayment = () => {
  const iniciarCobrancaAsaas = async (
    selectedLines: Line[],
    selectedDueDate: number | null,
    acceptedTerms: boolean,
    setIsAsaasProcessing: (processing: boolean) => void
  ): Promise<boolean> => {
    try {
      console.log('🔄 Iniciando cobrança Asaas...');
      setIsAsaasProcessing(true);

      // Verificar se o usuário está autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('❌ Usuário não autenticado:', userError);
        toast({
          title: "Erro de autenticação",
          description: "Faça login novamente para continuar.",
          variant: "destructive",
        });
        return false;
      }

      // Validações básicas
      if (!selectedLines || selectedLines.length === 0) {
        toast({
          title: "Erro",
          description: "Nenhuma linha selecionada",
          variant: "destructive",
        });
        return false;
      }

      if (!selectedDueDate) {
        toast({
          title: "Erro",
          description: "Data de vencimento não selecionada",
          variant: "destructive",
        });
        return false;
      }

      if (!acceptedTerms) {
        toast({
          title: "Erro",
          description: "É necessário aceitar os termos",
          variant: "destructive",
        });
        return false;
      }

      // Buscar dados do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.error('❌ Erro ao buscar perfil:', profileError);
        toast({
          title: "Erro",
          description: "Dados do usuário não encontrados",
          variant: "destructive",
        });
        return false;
      }

      // Buscar endereço do usuário
      const { data: address, error: addressError } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (addressError || !address) {
        console.error('❌ Erro ao buscar endereço:', addressError);
        toast({
          title: "Erro",
          description: "Endereço não encontrado. Complete seu cadastro primeiro.",
          variant: "destructive",
        });
        return false;
      }

      // Buscar o plano selecionado
      let planData = null;
      const storedPlan = localStorage.getItem('selectedPlan');
      if (storedPlan) {
        try {
          planData = JSON.parse(storedPlan);
        } catch (e) {
          console.error('Erro ao parse do plano:', e);
        }
      }

      // Se não tem plano no localStorage, usar dados da linha
      if (!planData && selectedLines.length > 0) {
        planData = {
          name: selectedLines[0].internet,
          price: selectedLines[0].price,
          title: selectedLines[0].planName || selectedLines[0].internet
        };
      }

      if (!planData) {
        toast({
          title: "Erro",
          description: "Dados do plano não encontrados",
          variant: "destructive",
        });
        return false;
      }

      // Buscar ou criar um plano padrão baseado no internet selecionado
      let planId = planData.id;
      
      if (!planId) {
        console.log('🔍 Buscando plano baseado no internet:', selectedLines[0].internet);
        
        // Buscar plano existente baseado no título
        const { data: existingPlans, error: planSearchError } = await supabase
          .from('plans')
          .select('id')
          .ilike('title', `%${selectedLines[0].internet}%`)
          .eq('status', 'active')
          .limit(1);

        if (planSearchError) {
          console.error('❌ Erro ao buscar planos:', planSearchError);
        }

        if (existingPlans && existingPlans.length > 0) {
          planId = existingPlans[0].id;
          console.log('✅ Plano encontrado:', planId);
        } else {
          // Criar plano se não existir
          console.log('🔄 Criando novo plano...');
          const { data: newPlan, error: createPlanError } = await supabase
            .from('plans')
            .insert({
              title: `Plano ${selectedLines[0].internet}`,
              description: `Plano de ${selectedLines[0].internet} com minutos ilimitados`,
              value: selectedLines[0].price,
              status: 'active'
            })
            .select('id')
            .single();

          if (createPlanError) {
            console.error('❌ Erro ao criar plano:', createPlanError);
            toast({
              title: "Erro",
              description: "Erro ao criar plano: " + createPlanError.message,
              variant: "destructive",
            });
            return false;
          }

          planId = newPlan.id;
          console.log('✅ Novo plano criado:', planId);
        }
      }

      // Calcular total
      const total = selectedLines.reduce((acc, line) => acc + line.price, 0);

      console.log('📋 Dados preparados para pagamento:', {
        userId: user.id,
        userEmail: user.email,
        userName: profile.full_name,
        userCpf: profile.cpf,
        userPhone: profile.whatsapp || profile.phone,
        planName: planData.title,
        planId: planId,
        total,
        dueDate: selectedDueDate,
        hasAddress: !!address
      });

      // Preparar dados para criar o pedido - garantindo que plan_id nunca seja null
      const orderData = {
        user_id: user.id,
        plan_id: planId, // Garantimos que sempre tem um valor
        total_amount: total,
        payment_method: 'pix',
        status: 'pending',
        notes: `Plano: ${planData.title} - DDD: ${selectedLines[0]?.ddd} - Vencimento: ${selectedDueDate}`
      };

      // Criar o pedido no banco
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error('❌ Erro ao criar pedido:', orderError);
        toast({
          title: "Erro",
          description: "Erro ao criar pedido: " + orderError.message,
          variant: "destructive",
        });
        return false;
      }

      console.log('✅ Pedido criado:', order);

      // Preparar dados para a Edge Function do Asaas
      const asaasData = {
        name: profile.full_name || 'Cliente',
        email: user.email,
        cpfCnpj: profile.cpf || '',
        phone: profile.whatsapp || profile.phone || '',
        value: total,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        description: `Pedido ${order.id} - ${planData.title}`,
        orderId: order.id
      };

      console.log('🔄 Chamando Edge Function asaas-payment...');

      // Chamar a Edge Function do Asaas
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('asaas-payment', {
        body: asaasData
      });

      if (paymentError) {
        console.error('❌ Erro na Edge Function:', paymentError);
        toast({
          title: "Erro no pagamento",
          description: "Erro ao processar pagamento: " + paymentError.message,
          variant: "destructive",
        });
        return false;
      }

      if (paymentData.error) {
        console.error('❌ Erro retornado pela Edge Function:', paymentData.error);
        toast({
          title: "Erro no pagamento",
          description: paymentData.error.message || "Erro desconhecido",
          variant: "destructive",
        });
        return false;
      }

      console.log('✅ Pagamento criado com sucesso:', paymentData);

      // Atualizar o pedido com o ID do Asaas
      if (paymentData.id) {
        await supabase
          .from('orders')
          .update({ 
            asaas_payment_id: paymentData.id,
            status: 'payment_pending' 
          })
          .eq('id', order.id);
      }

      // Salvar dados para uso posterior
      localStorage.setItem('orderData', JSON.stringify({
        orderId: order.id,
        protocol: order.id,
        paymentId: paymentData.id,
        invoiceUrl: paymentData.invoiceUrl,
        selectedLines,
        selectedDueDate,
        total
      }));

      toast({
        title: "Pagamento criado!",
        description: "Redirecionando para pagamento...",
      });

      // Abrir link de pagamento em nova aba
      if (paymentData.invoiceUrl) {
        window.open(paymentData.invoiceUrl, '_blank');
      }

      // Redirecionar para página de retorno
      setTimeout(() => {
        window.location.href = '/client/payment-return';
      }, 1500);

      return true;

    } catch (error) {
      console.error('💥 Erro inesperado:', error);
      toast({
        title: "Erro inesperado",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsAsaasProcessing(false);
    }
  };

  return { iniciarCobrancaAsaas };
};
