
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

    const body = await req.text();
    console.log('📄 [ASAAS-PAYMENT] Body recebido (length):', body.length);

    const requestData = JSON.parse(body);
    console.log('📋 [ASAAS-PAYMENT] Dados parseados:', {
      name: requestData.name,
      email: requestData.email,
      value: requestData.value,
      dueDate: requestData.dueDate,
      planName: requestData.planName,
      userId: requestData.userId
    });

    // Verificar variáveis de ambiente
    const asaasApiKey = Deno.env.get('ASAAS_API_KEY');
    if (!asaasApiKey) {
      console.error('❌ [ASAAS-PAYMENT] ASAAS_API_KEY não configurada');
      throw new Error('Chave da API do Asaas não configurada');
    }

    console.log('🔐 [ASAAS-PAYMENT] ASAAS_API_KEY configurada');

    // Preparar dados do cliente
    const customerData = {
      name: requestData.name,
      email: requestData.email,
      cpfCnpj: requestData.cpfCnpj || "",
      phone: requestData.phone || "",
      mobilePhone: requestData.whatsapp || "",
    };

    // Adicionar endereço se disponível
    if (requestData.address && requestData.city && requestData.state && requestData.zipCode) {
      customerData.address = requestData.address;
      customerData.city = requestData.city;
      customerData.state = requestData.state;
      customerData.postalCode = requestData.zipCode;
    }

    console.log('👤 [ASAAS-PAYMENT] Dados do cliente preparados');

    // Configurar headers para API do Asaas com timeout e retry
    const asaasHeaders = {
      'Content-Type': 'application/json',
      'access_token': asaasApiKey,
      'User-Agent': 'Smartvoz/1.0'
    };

    // Função para fazer requisições com retry
    const fetchWithRetry = async (url: string, options: any, maxRetries = 3) => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          console.log(`🔄 [ASAAS-PAYMENT] Tentativa ${i + 1} para ${url}`);
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout
          
          const response = await fetch(url, {
            ...options,
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          return response;
        } catch (error) {
          console.error(`❌ [ASAAS-PAYMENT] Erro na tentativa ${i + 1}:`, error.message);
          
          if (i === maxRetries - 1) {
            throw error;
          }
          
          // Aguardar antes da próxima tentativa
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };

    let customerId;

    try {
      // Verificar se cliente já existe
      console.log('🔍 [ASAAS-PAYMENT] Verificando cliente existente...');
      const searchUrl = `https://sandbox.asaas.com/api/v3/customers?email=${encodeURIComponent(customerData.email)}`;
      
      const searchResponse = await fetchWithRetry(searchUrl, {
        method: 'GET',
        headers: asaasHeaders
      });

      const searchResult = await searchResponse.json();
      console.log('🔍 [ASAAS-PAYMENT] Resultado da busca:', { 
        totalCount: searchResult.totalCount
      });

      if (searchResult.totalCount > 0 && searchResult.data?.length > 0) {
        customerId = searchResult.data[0].id;
        console.log('✅ [ASAAS-PAYMENT] Cliente existente encontrado:', customerId);

        // Atualizar dados do cliente
        console.log('🔄 [ASAAS-PAYMENT] Atualizando cliente...');
        await fetchWithRetry(`https://sandbox.asaas.com/api/v3/customers/${customerId}`, {
          method: 'PUT',
          headers: asaasHeaders,
          body: JSON.stringify(customerData)
        });
        
        console.log('✅ [ASAAS-PAYMENT] Cliente atualizado');
      } else {
        // Criar novo cliente
        console.log('👤 [ASAAS-PAYMENT] Criando novo cliente...');
        const createResponse = await fetchWithRetry('https://sandbox.asaas.com/api/v3/customers', {
          method: 'POST',
          headers: asaasHeaders,
          body: JSON.stringify(customerData)
        });

        const newCustomer = await createResponse.json();
        customerId = newCustomer.id;
        console.log('✅ [ASAAS-PAYMENT] Novo cliente criado:', customerId);
      }
    } catch (error) {
      console.error('❌ [ASAAS-PAYMENT] Erro ao gerenciar cliente:', error.message);
      throw new Error('Erro ao criar/atualizar cliente no Asaas');
    }

    // Criar cobrança
    console.log('💰 [ASAAS-PAYMENT] Criando cobrança...');

    const chargeData = {
      customer: customerId,
      billingType: 'PIX',
      value: requestData.value,
      dueDate: requestData.dueDate,
      description: `Plano ${requestData.planName} - ${requestData.planType} (DDD ${requestData.planDdd})`,
      externalReference: `smartvoz_${requestData.userId}_${Date.now()}`
    };

    console.log('💰 [ASAAS-PAYMENT] Dados da cobrança:', chargeData);

    const chargeResponse = await fetchWithRetry('https://sandbox.asaas.com/api/v3/payments', {
      method: 'POST',
      headers: asaasHeaders,
      body: JSON.stringify(chargeData)
    });

    const charge = await chargeResponse.json();
    console.log('✅ [ASAAS-PAYMENT] Cobrança criada:', {
      id: charge.id,
      status: charge.status,
      value: charge.value
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
    console.error('❌ [ASAAS-PAYMENT] Erro geral:', error);
    
    // Retornar erro mais específico
    let errorMessage = 'Erro interno do servidor';
    let statusCode = 500;
    
    if (error.message.includes('fetch')) {
      errorMessage = 'Erro de conectividade com o Asaas. Tente novamente.';
      statusCode = 503;
    } else if (error.message.includes('timeout') || error.message.includes('AbortError')) {
      errorMessage = 'Timeout na conexão com o Asaas. Tente novamente.';
      statusCode = 504;
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
