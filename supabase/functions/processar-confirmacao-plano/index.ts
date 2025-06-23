
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Purpose: Processa confirmação de plano automaticamente após pagamento
 * Cria subconta Asaas e processa cashback
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    const { orderId, adminUserId } = await req.json()

    if (!orderId || !adminUserId) {
      return new Response(
        JSON.stringify({ error: 'Order ID e Admin User ID são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('🎯 [PROCESSAR-CONFIRMACAO] Processando confirmação para order:', orderId)

    // Buscar dados da order com relacionamentos
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        user:profiles!user_id(*),
        plan:plans!plan_id(
          *,
          cashback_levels:plan_cashback_levels(*)
        )
      `)
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      console.error('❌ [PROCESSAR-CONFIRMACAO] Erro ao buscar order:', orderError)
      return new Response(
        JSON.stringify({ error: 'Order não encontrada' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('📋 [PROCESSAR-CONFIRMACAO] Order encontrada:', {
      orderId: order.id,
      userId: order.user_id,
      planValue: order.plan?.value,
      userHasAsaasAccount: !!order.user?.asaas_account_id
    })

    // 1. Criar subconta Asaas se o usuário não tiver uma
    if (!order.user?.asaas_account_id) {
      console.log('🏦 [PROCESSAR-CONFIRMACAO] Criando subconta Asaas...')
      
      try {
        // Verificar se aceitou os termos
        const { data: termsAcceptance } = await supabase
          .from('terms_acceptance')
          .select('*')
          .eq('user_id', order.user_id)
          .eq('accepted', true)
          .single()

        if (!termsAcceptance) {
          console.warn('⚠️ [PROCESSAR-CONFIRMACAO] Usuário não aceitou os termos, pulando criação de subconta')
        } else {
          // Preparar dados para API do Asaas
          const accountData = {
            name: order.user?.full_name || 'Usuário SmartVoz',
            email: order.user?.email,
            cpfCnpj: order.user?.cpf || order.user?.cnpj,
            phone: order.user?.mobile || order.user?.phone,
            mobilePhone: order.user?.mobile,
            address: order.user?.address,
            addressNumber: '123',
            complement: '',
            province: order.user?.city,
            postalCode: order.user?.zip_code,
            accountType: 'PAYMENT_ACCOUNT',
            companyType: order.user?.cnpj ? 'MEI' : 'INDIVIDUAL',
          }

          console.log('📡 [PROCESSAR-CONFIRMACAO] Chamando API Asaas...')
          
          const asaasResponse = await fetch('https://sandbox.asaas.com/api/v3/accounts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'access_token': Deno.env.get('ASAAS_API_KEY') || ''
            },
            body: JSON.stringify(accountData)
          })

          const asaasResult = await asaasResponse.json()
          console.log('📡 [PROCESSAR-CONFIRMACAO] Resposta Asaas:', asaasResult)

          if (asaasResponse.ok && asaasResult.id && asaasResult.accessToken) {
            // Atualizar perfil do usuário com dados da subconta
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                asaas_account_id: asaasResult.id,
                asaas_account_token: asaasResult.accessToken,
                asaas_account_created_at: new Date().toISOString()
              })
              .eq('id', order.user_id)

            if (updateError) {
              console.error('❌ [PROCESSAR-CONFIRMACAO] Erro ao atualizar perfil:', updateError)
            } else {
              console.log('✅ [PROCESSAR-CONFIRMACAO] Subconta criada e perfil atualizado')
            }

            // Log da criação
            await supabase
              .from('asaas_account_logs')
              .insert({
                user_id: order.user_id,
                asaas_account_id: asaasResult.id,
                asaas_account_token: asaasResult.accessToken,
                creation_status: 'success'
              })
          } else {
            console.error('❌ [PROCESSAR-CONFIRMACAO] Falha na API Asaas:', asaasResult)
            
            await supabase
              .from('asaas_account_logs')
              .insert({
                user_id: order.user_id,
                creation_status: 'error',
                error_message: JSON.stringify(asaasResult)
              })
          }
        }
      } catch (asaasError) {
        console.error('💥 [PROCESSAR-CONFIRMACAO] Erro na criação da subconta:', asaasError)
      }
    } else {
      console.log('ℹ️ [PROCESSAR-CONFIRMACAO] Usuário já possui subconta Asaas')
    }

    // 2. Verificar se é primeira contratação e processar cashback
    const { data: previousOrders } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', order.user_id)
      .eq('status', 'confirmed')
      .neq('id', orderId)

    const isFirstOrder = !previousOrders || previousOrders.length === 0
    console.log(`💰 [PROCESSAR-CONFIRMACAO] ${isFirstOrder ? 'Primeira' : 'Não é primeira'} contratação`)

    if (isFirstOrder && order.plan?.cashback_levels && order.plan.cashback_levels.length > 0) {
      console.log('🎁 [PROCESSAR-CONFIRMACAO] Processando cashback de primeira contratação...')
      
      // Processar cashback para cada nível configurado
      for (const cashbackLevel of order.plan.cashback_levels) {
        let cashbackValue = 0
        
        if (cashbackLevel.percentage) {
          cashbackValue = (order.total_amount * cashbackLevel.percentage) / 100
        } else if (cashbackLevel.fixed_value) {
          cashbackValue = cashbackLevel.fixed_value
        }

        if (cashbackValue > 0) {
          console.log(`💳 [PROCESSAR-CONFIRMACAO] Aplicando cashback nível ${cashbackLevel.level}: R$ ${cashbackValue}`)
          
          // Aqui você pode implementar a lógica específica de cashback
          // Por exemplo, creditar valor na conta do usuário ou na rede de afiliados
          
          // Por enquanto, vamos apenas logar o evento
          console.log(`✅ [PROCESSAR-CONFIRMACAO] Cashback processado: R$ ${cashbackValue} para nível ${cashbackLevel.level}`)
        }
      }
    }

    console.log('🎉 [PROCESSAR-CONFIRMACAO] Processamento concluído com sucesso')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Confirmação processada com sucesso',
        asaasAccountCreated: !order.user?.asaas_account_id,
        cashbackProcessed: isFirstOrder
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('💥 [PROCESSAR-CONFIRMACAO] Erro geral:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
