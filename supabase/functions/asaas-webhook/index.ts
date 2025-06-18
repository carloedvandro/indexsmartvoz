
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, asaas-access-token',
};

/**
 * Purpose: Processa webhooks do Asaas para atualizar status de pagamentos
 * Atualiza orders table quando pagamento é confirmado
 */

serve(async (req: Request) => {
  console.log('🎣 [ASAAS-WEBHOOK] Webhook chamado:', req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Método não permitido", { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    // Verificar token de acesso do Asaas (se configurado)
    const asaasToken = req.headers.get('asaas-access-token');
    const expectedToken = Deno.env.get('ASAAS_WEBHOOK_TOKEN');
    
    if (expectedToken && asaasToken !== expectedToken) {
      console.error('❌ [ASAAS-WEBHOOK] Token de acesso inválido');
      return new Response("Token de acesso inválido", { 
        status: 401,
        headers: corsHeaders 
      });
    }

    const event = await req.json();
    console.log('📨 [ASAAS-WEBHOOK] Evento recebido:', {
      event: event.event,
      paymentId: event.payment?.id,
      status: event.payment?.status,
      value: event.payment?.value,
      headers: Object.fromEntries(req.headers.entries())
    });

    // Inicializar cliente Supabase com service role para bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Processar evento de pagamento confirmado
    if (event.event === "PAYMENT_CONFIRMED" && event.payment) {
      const paymentId = event.payment.id;
      const paymentValue = event.payment.value;
      const customerEmail = event.payment.customer;

      console.log('✅ [ASAAS-WEBHOOK] Processando pagamento confirmado:', {
        paymentId,
        paymentValue,
        customerEmail
      });

      // Buscar usuário pelo email do cliente
      const { data: profiles, error: profileError } = await supabaseClient
        .from('profiles')
        .select('id, email')
        .eq('email', customerEmail)
        .limit(1);

      if (profileError) {
        console.error('❌ [ASAAS-WEBHOOK] Erro ao buscar perfil:', profileError);
        return new Response("Erro ao buscar usuário", { 
          status: 500,
          headers: corsHeaders 
        });
      }

      if (!profiles || profiles.length === 0) {
        console.warn('⚠️ [ASAAS-WEBHOOK] Usuário não encontrado para email:', customerEmail);
        return new Response("Usuário não encontrado", { 
          status: 404,
          headers: corsHeaders 
        });
      }

      const userId = profiles[0].id;

      // Atualizar ou criar registro na tabela orders
      const { data: order, error: orderError } = await supabaseClient
        .from('orders')
        .upsert({
          user_id: userId,
          asaas_payment_id: paymentId,
          total_amount: paymentValue,
          status: 'paid',
          payment_method: 'pix',
          notes: `Pagamento confirmado via webhook Asaas - Payment ID: ${paymentId}`,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'asaas_payment_id'
        })
        .select()
        .single();

      if (orderError) {
        console.error('❌ [ASAAS-WEBHOOK] Erro ao atualizar order:', orderError);
        return new Response("Erro ao atualizar pedido", { 
          status: 500,
          headers: corsHeaders 
        });
      }

      console.log('✅ [ASAAS-WEBHOOK] Order atualizada com sucesso:', order);
    }

    // Processar outros eventos se necessário
    else if (event.event === "PAYMENT_OVERDUE") {
      console.log('⏰ [ASAAS-WEBHOOK] Pagamento vencido:', event.payment?.id);
    }
    else if (event.event === "PAYMENT_DELETED") {
      console.log('🗑️ [ASAAS-WEBHOOK] Pagamento cancelado:', event.payment?.id);
    }

    return new Response("OK", { 
      status: 200,
      headers: corsHeaders 
    });
  } catch (e) {
    console.error('💥 [ASAAS-WEBHOOK] Erro geral:', e);
    return new Response("Erro interno na tratativa do webhook", { 
      status: 500,
      headers: corsHeaders 
    });
  }
});
