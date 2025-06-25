
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestData {
  name: string;
  email: string;
  value: number;
  dueDate: string;
  planName: string;
  userId: string;
  cpfCnpj?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  planType?: string;
  planDdd?: string;
  returnUrl?: string;
}

interface CustomerData {
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  mobilePhone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

interface ChargeData {
  customer: string;
  billingType?: string; // Mudou para opcional para permitir todos os tipos
  value: number;
  dueDate: string;
  description: string;
  externalReference: string;
  callback?: {
    successUrl: string;
    autoRedirect: boolean;
  };
}

/**
 * Valida as variáveis de ambiente necessárias
 */
function validateEnvironmentVariables(): string {
  const asaasApiKey = Deno.env.get('ASAAS_API_KEY');
  if (!asaasApiKey) {
    console.error('❌ [ASAAS-PAYMENT] ASAAS_API_KEY não configurada');
    throw new Error('Chave da API do Asaas não configurada');
  }
  console.log('🔐 [ASAAS-PAYMENT] ASAAS_API_KEY configurada');
  return asaasApiKey;
}

/**
 * Prepara os dados do cliente para o Asaas
 */
function prepareCustomerData(requestData: RequestData): CustomerData {
  const customerData: CustomerData = {
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
  return customerData;
}

/**
 * Configura headers para requisições ao Asaas
 */
function getAsaasHeaders(apiKey: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'access_token': apiKey,
    'User-Agent': 'Smartvoz/1.0'
  };
}

/**
 * Função para fazer requisições com retry
 */
async function fetchWithRetry(url: string, options: any, maxRetries = 3): Promise<Response> {
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
  throw new Error('Máximo de tentativas excedido');
}

/**
 * Busca ou cria cliente no Asaas
 */
async function getOrCreateCustomer(customerData: CustomerData, headers: Record<string, string>): Promise<string> {
  try {
    // Verificar se cliente já existe
    console.log('🔍 [ASAAS-PAYMENT] Verificando cliente existente...');
    const searchUrl = `https://sandbox.asaas.com/api/v3/customers?email=${encodeURIComponent(customerData.email)}`;
    
    const searchResponse = await fetchWithRetry(searchUrl, {
      method: 'GET',
      headers: headers
    });

    const searchResult = await searchResponse.json();
    console.log('🔍 [ASAAS-PAYMENT] Resultado da busca:', { 
      totalCount: searchResult.totalCount
    });

    if (searchResult.totalCount > 0 && searchResult.data?.length > 0) {
      const customerId = searchResult.data[0].id;
      console.log('✅ [ASAAS-PAYMENT] Cliente existente encontrado:', customerId);

      // Atualizar dados do cliente
      console.log('🔄 [ASAAS-PAYMENT] Atualizando cliente...');
      await fetchWithRetry(`https://sandbox.asaas.com/api/v3/customers/${customerId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(customerData)
      });
      
      console.log('✅ [ASAAS-PAYMENT] Cliente atualizado');
      return customerId;
    } else {
      // Criar novo cliente
      console.log('👤 [ASAAS-PAYMENT] Criando novo cliente...');
      const createResponse = await fetchWithRetry('https://sandbox.asaas.com/api/v3/customers', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(customerData)
      });

      const newCustomer = await createResponse.json();
      const customerId = newCustomer.id;
      console.log('✅ [ASAAS-PAYMENT] Novo cliente criado:', customerId);
      return customerId;
    }
  } catch (error) {
    console.error('❌ [ASAAS-PAYMENT] Erro ao gerenciar cliente:', error.message);
    throw new Error('Erro ao criar/atualizar cliente no Asaas');
  }
}

/**
 * Prepara dados da cobrança
 */
function prepareChargeData(requestData: RequestData, customerId: string): ChargeData {
  const chargeData: ChargeData = {
    customer: customerId,
    // billingType removido para permitir todos os tipos de pagamento
    value: requestData.value,
    dueDate: requestData.dueDate,
    description: `Plano ${requestData.planName || 'Smartvoz'} - ${requestData.planType || 'Telefonia'} (DDD ${requestData.planDdd || 'N/A'})`,
    externalReference: `smartvoz_${requestData.userId || 'guest'}_${Date.now()}`
  };

  // Configurar callback de retorno automatico
  const returnUrl = requestData.returnUrl || `${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '') || 'https://maelrohlhrhihntydydh.supabase.co'}/client/payment-return`;
  
  chargeData.callback = {
    successUrl: returnUrl,
    autoRedirect: true
  };
  
  console.log('🔗 [ASAAS-PAYMENT] Callback configurado:', chargeData.callback);
  console.log('💰 [ASAAS-PAYMENT] Dados da cobrança:', {
    ...chargeData,
    billingType: 'UNDEFINED (todos os tipos)'
  });
  
  return chargeData;
}

/**
 * Cria cobrança no Asaas
 */
async function createCharge(chargeData: ChargeData, headers: Record<string, string>): Promise<any> {
  console.log('💰 [ASAAS-PAYMENT] Criando cobrança com todos os tipos de pagamento...');

  const chargeResponse = await fetchWithRetry('https://sandbox.asaas.com/api/v3/payments', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(chargeData)
  });

  const charge = await chargeResponse.json();
  console.log('✅ [ASAAS-PAYMENT] Cobrança criada:', {
    id: charge.id,
    status: charge.status,
    value: charge.value,
    billingType: charge.billingType || 'TODOS OS TIPOS',
    callbackConfigured: !!charge.callback
  });

  return charge;
}

/**
 * Processa erro e retorna resposta apropriada
 */
function handleError(error: Error): Response {
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

    const requestData: RequestData = JSON.parse(body);
    console.log('📋 [ASAAS-PAYMENT] Dados parseados:', {
      name: requestData.name,
      email: requestData.email,
      value: requestData.value,
      dueDate: requestData.dueDate,
      planName: requestData.planName,
      userId: requestData.userId,
      returnUrl: requestData.returnUrl,
      billingType: 'TODOS OS TIPOS (undefined)'
    });

    // Validar variáveis de ambiente
    const asaasApiKey = validateEnvironmentVariables();
    
    // Preparar dados do cliente
    const customerData = prepareCustomerData(requestData);
    
    // Configurar headers
    const asaasHeaders = getAsaasHeaders(asaasApiKey);
    
    // Buscar ou criar cliente
    const customerId = await getOrCreateCustomer(customerData, asaasHeaders);
    
    // Preparar dados da cobrança
    const chargeData = prepareChargeData(requestData, customerId);
    
    // Criar cobrança
    const charge = await createCharge(chargeData, asaasHeaders);

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
        customerId: customerId,
        billingType: charge.billingType || 'TODOS OS TIPOS',
        callbackUrl: chargeData.callback?.successUrl,
        autoRedirect: chargeData.callback?.autoRedirect
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    return handleError(error);
  }
})
