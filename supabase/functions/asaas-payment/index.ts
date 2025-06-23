
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ [ASAAS-PAYMENT] Respondendo CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 [ASAAS-PAYMENT] Função iniciada');
    console.log('📋 [ASAAS-PAYMENT] Método:', req.method);
    console.log('📋 [ASAAS-PAYMENT] Headers:', Object.fromEntries(req.headers.entries()));
    console.log('📋 [ASAAS-PAYMENT] Content-Type:', req.headers.get('content-type'));

    const body = await req.text();
    console.log('📄 [ASAAS-PAYMENT] Body recebido (length):', body.length);
    console.log('📄 [ASAAS-PAYMENT] Body recebido (preview):', body.substring(0, 500));

    const requestData = JSON.parse(body);
    console.log('📋 [ASAAS-PAYMENT] Dados completos parseados:', {
      name: requestData.name,
      email: requestData.email,
      value: requestData.value,
      dueDate: requestData.dueDate,
      hasCpf: !!requestData.cpfCnpj,
      hasPhone: !!requestData.phone,
      hasAddress: !!requestData.address,
      hasWhatsapp: !!requestData.whatsapp,
      planName: requestData.planName,
      planType: requestData.planType,
      userId: requestData.userId,
      returnUrl: requestData.returnUrl
    });

    // Verificar variáveis de ambiente
    console.log('🔐 [ASAAS-PAYMENT] Variáveis de ambiente:');
    console.log('  - ASAAS_API_KEY:', Deno.env.get('ASAAS_API_KEY') ? `CONFIGURADA (${Deno.env.get('ASAAS_API_KEY')?.length} chars)` : 'NÃO CONFIGURADA');

    // Preparar dados completos do cliente
    console.log('👤 [ASAAS-PAYMENT] Preparando dados completos do cliente...');
    
    const customerData: any = {
      name: requestData.name,
      email: requestData.email
    };

    // Adicionar CPF/CNPJ se disponível
    if (requestData.cpfCnpj) {
      customerData.cpfCnpj = requestData.cpfCnpj;
      console.log('📄 [ASAAS-PAYMENT] CPF/CNPJ adicionado (length):', requestData.cpfCnpj.length);
    }

    // Adicionar telefone se disponível
    if (requestData.phone) {
      customerData.phone = requestData.phone;
    }

    // Adicionar celular se disponível
    if (requestData.whatsapp) {
      customerData.mobilePhone = requestData.whatsapp;
    }

    // Adicionar endereço se disponível
    if (requestData.address && requestData.city && requestData.state && requestData.zipCode) {
      customerData.address = requestData.address;
      customerData.city = requestData.city;
      customerData.state = requestData.state;
      customerData.postalCode = requestData.zipCode;
    }

    console.log('👤 [ASAAS-PAYMENT] Dados completos do cliente preparados:', {
      name: customerData.name,
      email: customerData.email,
      cpfCnpj: customerData.cpfCnpj ? 'PRESENTE' : 'AUSENTE',
      phone: customerData.phone ? 'PRESENTE' : 'AUSENTE',
      mobilePhone: customerData.mobilePhone ? 'PRESENTE' : 'AUSENTE',
      address: customerData.address ? 'PRESENTE' : 'AUSENTE'
    });

    // Configurar headers para API do Asaas
    console.log('🔍 [ASAAS-PAYMENT] Headers preparados para Asaas Sandbox');
    const asaasHeaders = {
      'Content-Type': 'application/json',
      'access_token': Deno.env.get('ASAAS_API_KEY') || ''
    };

    // Verificar se cliente já existe
    console.log('🔍 [ASAAS-PAYMENT] Verificando se cliente já existe...');
    const searchUrl = `https://sandbox.asaas.com/api/v3/customers?email=${encodeURIComponent(customerData.email)}`;
    console.log('🔍 [ASAAS-PAYMENT] URL de busca:', searchUrl);

    const searchResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: asaasHeaders
    });

    console.log('🔍 [ASAAS-PAYMENT] Status da busca:', searchResponse.status);
    console.log('🔍 [ASAAS-PAYMENT] Status text:', searchResponse.statusText);

    const searchResult = await searchResponse.json();
    console.log('🔍 [ASAAS-PAYMENT] Resultado da busca:', { 
      totalCount: searchResult.totalCount, 
      hasData: !!searchResult.data,
      dataLength: searchResult.data?.length || 0
    });

    let customerId;

    if (searchResult.totalCount > 0 && searchResult.data?.length > 0) {
      customerId = searchResult.data[0].id;
      console.log('✅ [ASAAS-PAYMENT] Cliente existente encontrado:', customerId);

      // Atualizar dados do cliente
      console.log('🔄 [ASAAS-PAYMENT] Atualizando dados do cliente existente...');
      const updateResponse = await fetch(`https://sandbox.asaas.com/api/v3/customers/${customerId}`, {
        method: 'PUT',
        headers: asaasHeaders,
        body: JSON.stringify(customerData)
      });

      if (updateResponse.ok) {
        console.log('✅ [ASAAS-PAYMENT] Cliente atualizado com sucesso');
      } else {
        const updateError = await updateResponse.text();
        console.error('❌ [ASAAS-PAYMENT] Erro ao atualizar cliente:', updateError);
      }
    } else {
      // Criar novo cliente
      console.log('👤 [ASAAS-PAYMENT] Criando novo cliente...');
      const createResponse = await fetch('https://sandbox.asaas.com/api/v3/customers', {
        method: 'POST',
        headers: asaasHeaders,
        body: JSON.stringify(customerData)
      });

      if (createResponse.ok) {
        const newCustomer = await createResponse.json();
        customerId = newCustomer.id;
        console.log('✅ [ASAAS-PAYMENT] Novo cliente criado:', customerId);
      } else {
        const createError = await createResponse.text();
        console.error('❌ [ASAAS-PAYMENT] Erro ao criar cliente:', createError);
        throw new Error(`Erro ao criar cliente: ${createError}`);
      }
    }

    // Criar cobrança
    console.log('💰 [ASAAS-PAYMENT] Criando cobrança no Asaas Sandbox...');

    const chargeData = {
      customer: customerId,
      billingType: 'PIX',
      value: requestData.value,
      dueDate: requestData.dueDate,
      description: `Plano ${requestData.planName} - ${requestData.planType} (DDD ${requestData.planDdd})`,
      externalReference: `smartvoz_${requestData.userId}_${Date.now()}`
    };

    // Remover callback configurações por enquanto para evitar erro de domínio
    console.log('🔗 [ASAAS-PAYMENT] Criando cobrança sem callback (para evitar erro de domínio)');

    console.log('💰 [ASAAS-PAYMENT] Dados da cobrança:', chargeData);

    const chargeResponse = await fetch('https://sandbox.asaas.com/api/v3/payments', {
      method: 'POST',
      headers: asaasHeaders,
      body: JSON.stringify(chargeData)
    });

    console.log('💰 [ASAAS-PAYMENT] Resposta da cobrança - Status:', chargeResponse.status);
    console.log('💰 [ASAAS-PAYMENT] Resposta da cobrança - Status text:', chargeResponse.statusText);

    if (!chargeResponse.ok) {
      const errorText = await chargeResponse.text();
      console.error('❌ [ASAAS-PAYMENT] Erro ao criar cobrança:', errorText);
      console.error('❌ [ASAAS-PAYMENT] Status:', chargeResponse.status);
      
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao criar cobrança',
          details: errorText,
          status: chargeResponse.status
        }),
        { 
          status: chargeResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const charge = await chargeResponse.json();
    console.log('✅ [ASAAS-PAYMENT] Cobrança criada com sucesso:', {
      id: charge.id,
      status: charge.status,
      value: charge.value,
      invoiceUrl: charge.invoiceUrl,
      bankSlipUrl: charge.bankSlipUrl
    });

    // Retornar dados da cobrança
    return new Response(
      JSON.stringify({
        success: true,
        paymentId: charge.id,
        status: charge.status,
        value: charge.value,
        dueDate: charge.dueDate,
        invoiceUrl: charge.invoiceUrl,
        bankSlipUrl: charge.bankSlipUrl,
        pixCopyPaste: charge.pixCopyPaste,
        pixQrCode: charge.pixQrCode,
        customerId: customerId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ [ASAAS-PAYMENT] Erro na função:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
