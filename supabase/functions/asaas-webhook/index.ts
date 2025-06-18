
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, asaas-access-token',
};

/**
 * Purpose: Processa webhooks do Asaas para atualizar status de pagamentos
 * Atualiza orders table quando pagamento é confirmado
 * Configurado para não exigir JWT pois webhooks externos não podem fornecer tokens Supabase
 */

serve(async (req: Request) => {
  console.log('🎣 [ASAAS-WEBHOOK] =================================');
  console.log('🎣 [ASAAS-WEBHOOK] Webhook chamado:', req.method);
  console.log('🎣 [ASAAS-WEBHOOK] URL:', req.url);
  console.log('🎣 [ASAAS-WEBHOOK] Headers recebidos:', Object.fromEntries(req.headers.entries()));

  if (req.method === "OPTIONS") {
    console.log('✅ [ASAAS-WEBHOOK] Respondendo CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.log('❌ [ASAAS-WEBHOOK] Método não permitido:', req.method);
    return new Response("Método não permitido", { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    // Verificar token de acesso do Asaas (se configurado)
    const asaasToken = req.headers.get('asaas-access-token');
    const expectedToken = Deno.env.get('ASAAS_WEBHOOK_TOKEN');
    
    console.log('🔐 [ASAAS-WEBHOOK] Token recebido:', asaasToken ? 'PRESENTE' : 'AUSENTE');
    console.log('🔐 [ASAAS-WEBHOOK] Token esperado:', expectedToken ? 'CONFIGURADO' : 'NÃO CONFIGURADO');
    
    if (expectedToken && asaasToken !== expectedToken) {
      console.error('❌ [ASAAS-WEBHOOK] Token de acesso inválido');
      return new Response("Token de acesso inválido", { 
        status: 401,
        headers: corsHeaders 
      });
    }

    const eventBody = await req.text();
    console.log('📨 [ASAAS-WEBHOOK] Body recebido (raw):', eventBody);
    
    const event = JSON.parse(eventBody);
    console.log('📨 [ASAAS-WEBHOOK] Evento parseado:', JSON.stringify(event, null, 2));
    console.log('📨 [ASAAS-WEBHOOK] Tipo de evento:', event.event);
    console.log('📨 [ASAAS-WEBHOOK] Payment ID:', event.payment?.id);
    console.log('📨 [ASAAS-WEBHOOK] Payment Status:', event.payment?.status);
    console.log('📨 [ASAAS-WEBHOOK] Payment Value:', event.payment?.value);
    console.log('📨 [ASAAS-WEBHOOK] Customer:', event.payment?.customer);

    // Inicializar cliente Supabase com service role para bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [ASAAS-WEBHOOK] Configuração Supabase ausente');
      return new Response("Configuração do servidor ausente", { 
        status: 500,
        headers: corsHeaders 
      });
    }

    console.log('🔧 [ASAAS-WEBHOOK] Conectando ao Supabase...');
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

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

      // Primeiro, tentar encontrar a order pelo asaas_payment_id
      console.log('🔍 [ASAAS-WEBHOOK] Procurando order pelo payment_id:', paymentId);
      const { data: existingOrder, error: orderSearchError } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('asaas_payment_id', paymentId)
        .single();

      if (orderSearchError && orderSearchError.code !== 'PGRST116') {
        console.error('❌ [ASAAS-WEBHOOK] Erro ao buscar order:', orderSearchError);
        return new Response("Erro ao buscar pedido", { 
          status: 500,
          headers: corsHeaders 
        });
      }

      if (existingOrder) {
        console.log('📋 [ASAAS-WEBHOOK] Order encontrada:', existingOrder);
        
        // Atualizar order existente
        const { data: updatedOrder, error: updateError } = await supabaseClient
          .from('orders')
          .update({
            status: 'paid',
            updated_at: new Date().toISOString(),
            notes: `${existingOrder.notes || ''} | Pagamento confirmado via webhook Asaas em ${new Date().toISOString()}`
          })
          .eq('id', existingOrder.id)
          .select()
          .single();

        if (updateError) {
          console.error('❌ [ASAAS-WEBHOOK] Erro ao atualizar order:', updateError);
          return new Response("Erro ao atualizar pedido", { 
            status: 500,
            headers: corsHeaders 
          });
        }

        console.log('✅ [ASAAS-WEBHOOK] Order atualizada com sucesso:', updatedOrder);
      } else {
        console.log('⚠️ [ASAAS-WEBHOOK] Order não encontrada pelo payment_id, buscando por email...');
        
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
        console.log('👤 [ASAAS-WEBHOOK] Usuário encontrado:', userId);

        // Criar nova order ou atualizar order mais recente do usuário
        const { data: userOrders, error: userOrderError } = await supabaseClient
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (userOrderError) {
          console.error('❌ [ASAAS-WEBHOOK] Erro ao buscar orders do usuário:', userOrderError);
          return new Response("Erro ao buscar pedidos do usuário", { 
            status: 500,
            headers: corsHeaders 
          });
        }

        if (userOrders && userOrders.length > 0) {
          const recentOrder = userOrders[0];
          console.log('📋 [ASAAS-WEBHOOK] Order mais recente do usuário:', recentOrder);

          // Atualizar order mais recente
          const { data: updatedOrder, error: updateError } = await supabaseClient
            .from('orders')
            .update({
              asaas_payment_id: paymentId,
              status: 'paid',
              total_amount: paymentValue,
              updated_at: new Date().toISOString(),
              notes: `${recentOrder.notes || ''} | Pagamento confirmado via webhook Asaas - Payment ID: ${paymentId}`
            })
            .eq('id', recentOrder.id)
            .select()
            .single();

          if (updateError) {
            console.error('❌ [ASAAS-WEBHOOK] Erro ao atualizar order:', updateError);
            return new Response("Erro ao atualizar pedido", { 
              status: 500,
              headers: corsHeaders 
            });
          }

          console.log('✅ [ASAAS-WEBHOOK] Order atualizada com sucesso:', updatedOrder);
        } else {
          console.log('⚠️ [ASAAS-WEBHOOK] Nenhuma order encontrada para o usuário, criando nova...');

          // Criar nova order
          const { data: newOrder, error: createError } = await supabaseClient
            .from('orders')
            .insert({
              user_id: userId,
              plan_id: '00000000-0000-0000-0000-000000000000', // UUID padrão
              asaas_payment_id: paymentId,
              total_amount: paymentValue,
              status: 'paid',
              payment_method: 'pix',
              notes: `Pagamento confirmado via webhook Asaas - Payment ID: ${paymentId}`,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (createError) {
            console.error('❌ [ASAAS-WEBHOOK] Erro ao criar order:', createError);
            return new Response("Erro ao criar pedido", { 
              status: 500,
              headers: corsHeaders 
            });
          }

          console.log('✅ [ASAAS-WEBHOOK] Nova order criada:', newOrder);
        }
      }
    }

    // Processar outros eventos se necessário
    else if (event.event === "PAYMENT_OVERDUE") {
      console.log('⏰ [ASAAS-WEBHOOK] Pagamento vencido:', event.payment?.id);
    }
    else if (event.event === "PAYMENT_DELETED") {
      console.log('🗑️ [ASAAS-WEBHOOK] Pagamento cancelado:', event.payment?.id);
    }
    else {
      console.log('ℹ️ [ASAAS-WEBHOOK] Evento não processado:', event.event);
    }

    console.log('✅ [ASAAS-WEBHOOK] Webhook processado com sucesso');
    return new Response("OK", { 
      status: 200,
      headers: corsHeaders 
    });
  } catch (e) {
    console.error('💥 [ASAAS-WEBHOOK] Erro geral:', e);
    console.error('💥 [ASAAS-WEBHOOK] Stack trace:', e.stack);
    return new Response("Erro interno na tratativa do webhook", { 
      status: 500,
      headers: corsHeaders 
    });
  }
});
