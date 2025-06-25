
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
  billingType?: string;
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
  billingType: string;
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
 * Valida dados de entrada
 */
function validateRequestData(requestData: RequestData): void {
  if (!requestData.name || requestData.name.trim().length === 0) {
    throw new Error('Nome é obrigatório');
  }
  if (!requestData.email || !requestData.email.includes('@')) {
    throw new Error('Email válido é obrigatório');
  }
  if (!requestData.value || requestData.value <= 0) {
    throw new Error('Valor deve ser maior que zero');
  }
  if (!requestData.dueDate) {
    throw new Error('Data de vencimento é obrigatória');
  }
}

/**
 * Formata data para o padrão esperado pelo Asaas (YYYY-MM-DD)
 */
function formatDueDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Se não for uma data válida, usar data futura padrão (3 dias)
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      return futureDate.toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('❌ [ASAAS-PAYMENT] Erro ao formatar data:', error);
    // Fallback para 3 dias no futuro
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    return futureDate.toISOString().split('T')[0];
  }
}

/**
 * Prepara os dados do cliente para o Asaas
 */
function prepareCustomerData(requestData: RequestData): CustomerData {
  const customerData: CustomerData = {
    name: requestData.name.trim(),
    email: requestData.email.trim().toLowerCase(),
  };

  // Adicionar CPF/CNPJ se disponível (apenas números)
  if (requestData.cpfCnpj) {
    customerData.cpfCnpj = requestData.cpfCnpj.replace(/\D/g, '');
  }

  // Adicionar telefones se disponíveis (apenas números)
  if (requestData.phone) {
    customerData.phone = requestData.phone.replace(/\D/g, '');
  }
  if (requestData.whatsapp) {
    customerData.mobilePhone = requestData.whatsapp.replace(/\D/g, '');
  }

  // Adicionar endereço se todos os campos obrigatórios estiverem presentes
  if (requestData.address && requestData.city && requestData.state && requestData.zipCode) {
    customerData.address = requestData.address.trim();
    customerData.city = requestData.city.trim();
    customerData.state = requestData.state.trim();
    customerData.postalCode = requestData.zipCode.replace(/\D/g, '');
  }

  console.log('👤 [ASAAS-PAYMENT] Dados do cliente preparados:', {
    name: customerData.name,
    email: customerData.email,
    hasCpf: !!customerData.cpfCnpj,
    hasPhone: !!customerData.phone,
    hasAddress: !!customerData.address
  });
  
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
 * Função para fazer requisições com retry e melhor tratamento de erro
 */
async function fetchWithRetry(url: string, options: any, maxRetries = 3): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`🔄 [ASAAS-PAYMENT] Tentativa ${i + 1} para ${url}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Se não for bem-sucedida, logar detalhes do erro
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [ASAAS-PAYMENT] Erro HTTP ${response.status}:`, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
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
    // Verificar se cliente já existe pelo email
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

      // Atualizar dados do cliente existente
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
      
      if (!newCustomer.id) {
        console.error('❌ [ASAAS-PAYMENT] Resposta inválida ao criar cliente:', newCustomer);
        throw new Error('Falha ao criar cliente no Asaas');
      }
      
      const customerId = newCustomer.id;
      console.log('✅ [ASAAS-PAYMENT] Novo cliente criado:', customerId);
      return customerId;
    }
  } catch (error) {
    console.error('❌ [ASAAS-PAYMENT] Erro ao gerenciar cliente:', error.message);
    throw new Error('Erro ao criar/atualizar cliente no Asaas: ' + error.message);
  }
}

/**
 * Prepara dados da cobrança
 */
function prepareChargeData(requestData: RequestData, customerId: string): ChargeData {
  const formattedDueDate = formatDueDate(requestData.dueDate);
  
  const chargeData: ChargeData = {
    customer: customerId,
    billingType: requestData.billingType || 'UNDEFINED', // Define como 'UNDEFINED' em texto para permitir todos os tipos
    value: Number(requestData.value.toFixed(2)), // Garantir 2 casas decimais
    dueDate: formattedDueDate,
    description: `Plano ${requestData.planName || 'Smartvoz'} - ${requestData.planType || 'Telefonia'} (DDD ${requestData.planDdd || 'N/A'})`,
    externalReference: `smartvoz_${requestData.userId || 'guest'}_${Date.now()}`
  };

  // Configurar callback de retorno automático se returnUrl for fornecida
  if (requestData.returnUrl) {
    chargeData.callback = {
      successUrl: requestData.returnUrl,
      autoRedirect: true
    };
    console.log('🔗 [ASAAS-PAYMENT] Callback configurado:', chargeData.callback);
  } else {
    // URL padrão de retorno
    const baseUrl = Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '') || 'https://maelrohlhrhihntydydh.supabase.co';
    chargeData.callback = {
      successUrl: `${baseUrl}/client/payment-return`,
      autoRedirect: true
    };
    console.log('🔗 [ASAAS-PAYMENT] Callback padrão configurado:', chargeData.callback);
  }
  
  console.log('💰 [ASAAS-PAYMENT] Dados da cobrança:', {
    customer: chargeData.customer,
    value: chargeData.value,
    dueDate: chargeData.dueDate,
    billingType: chargeData.billingType,
    hasCallback: !!chargeData.callback
  });
  
  return chargeData;
}

/**
 * Cria cobrança no Asaas
 */
async function createCharge(chargeData: ChargeData, headers: Record<string, string>): Promise<any> {
  console.log('💰 [ASAAS-PAYMENT] Criando cobrança com billingType:', chargeData.billingType);

  const chargeResponse = await fetchWithRetry('https://sandbox.asaas.com/api/v3/payments', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(chargeData)
  });

  const charge = await chargeResponse.json();
  
  if (!charge.id) {
    console.error('❌ [ASAAS-PAYMENT] Resposta inválida ao criar cobrança:', charge);
    throw new Error('Falha ao criar cobrança no Asaas');
  }
  
  console.log('✅ [ASAAS-PAYMENT] Cobrança criada:', {
    id: charge.id,
    status: charge.status,
    value: charge.value,
    billingType: charge.billingType,
    callbackConfigured: !!charge.callback
  });

  return charge;
}

/**
 * Processa erro e retorna resposta apropriada
 */
function handleError(error: Error): Response {
  console.error('❌ [ASAAS-PAYMENT] Erro geral:', error);
  
  let errorMessage = 'Erro interno do servidor';
  let statusCode = 500;
  
  if (error.message.includes('HTTP 400')) {
    errorMessage = 'Dados inválidos enviados para o Asaas. Verifique os campos obrigatórios.';
    statusCode = 400;
  } else if (error.message.includes('HTTP 401')) {
    errorMessage = 'Erro de autenticação com o Asaas. Verifique a API key.';
    statusCode = 401;
  } else if (error.message.includes('fetch')) {
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

    if (!body || body.trim().length === 0) {
      throw new Error('Body da requisição está vazio');
    }

    const requestData: RequestData = JSON.parse(body);
    console.log('📋 [ASAAS-PAYMENT] Dados parseados:', {
      name: requestData.name,
      email: requestData.email,
      value: requestData.value,
      dueDate: requestData.dueDate,
      planName: requestData.planName,
      userId: requestData.userId,
      returnUrl: requestData.returnUrl,
      billingType: requestData.billingType || 'UNDEFINED (padrão)'
    });

    // Validar dados de entrada
    validateRequestData(requestData);

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
        billingType: charge.billingType || 'UNDEFINED',
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
