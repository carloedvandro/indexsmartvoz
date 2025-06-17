
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  value: number;
  dueDate: string;
  webhookUrl?: string;
}

// Função para validar e limpar CPF/CNPJ
function cleanDocument(doc: string): string {
  return doc.replace(/[^\d]/g, '');
}

// Função para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar telefone
function cleanPhone(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

serve(async (req) => {
  console.log('🚀 [ASAAS-PAYMENT] Função iniciada');
  console.log('📋 [ASAAS-PAYMENT] Método:', req.method);
  console.log('📋 [ASAAS-PAYMENT] Headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ [ASAAS-PAYMENT] Respondendo CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📋 [ASAAS-PAYMENT] Content-Type:', req.headers.get('content-type'));
    
    const body = await req.text();
    console.log('📄 [ASAAS-PAYMENT] Body recebido (length):', body.length);
    console.log('📄 [ASAAS-PAYMENT] Body recebido (preview):', body.substring(0, 200));
    
    const requestData: PaymentRequest = JSON.parse(body);
    console.log('📋 [ASAAS-PAYMENT] Dados parseados:', {
      name: requestData.name,
      email: requestData.email,
      value: requestData.value,
      dueDate: requestData.dueDate,
      hasCpf: !!requestData.cpfCnpj,
      hasPhone: !!requestData.phone
    });

    // Verificar variáveis de ambiente
    const ASAAS_API_KEY = Deno.env.get('ASAAS_API_KEY');
    console.log('🔐 [ASAAS-PAYMENT] Variáveis de ambiente:');
    console.log('  - ASAAS_API_KEY:', ASAAS_API_KEY ? `CONFIGURADA (${ASAAS_API_KEY.length} chars)` : 'AUSENTE');
    
    if (!ASAAS_API_KEY) {
      console.error('❌ [ASAAS-PAYMENT] ASAAS_API_KEY não configurada');
      return new Response(
        JSON.stringify({ error: { message: 'Configuração do pagamento não encontrada' } }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Validar dados obrigatórios
    if (!requestData.name || requestData.name.trim().length < 2) {
      console.error('❌ [ASAAS-PAYMENT] Nome inválido:', requestData.name);
      return new Response(
        JSON.stringify({ error: { message: 'Nome deve ter pelo menos 2 caracteres' } }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    if (!requestData.email || !isValidEmail(requestData.email)) {
      console.error('❌ [ASAAS-PAYMENT] Email inválido:', requestData.email);
      return new Response(
        JSON.stringify({ error: { message: 'Email inválido' } }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Preparar dados do cliente para o Asaas
    console.log('👤 [ASAAS-PAYMENT] Preparando dados do cliente...');
    
    const customerData: any = {
      name: requestData.name.trim(),
      email: requestData.email.toLowerCase().trim()
    };

    // Adicionar CPF/CNPJ se fornecido e válido
    if (requestData.cpfCnpj) {
      const cleanedDoc = cleanDocument(requestData.cpfCnpj);
      if (cleanedDoc.length === 11 || cleanedDoc.length === 14) {
        customerData.cpfCnpj = cleanedDoc;
        console.log('📄 [ASAAS-PAYMENT] CPF/CNPJ adicionado (length):', cleanedDoc.length);
      } else {
        console.log('⚠️ [ASAAS-PAYMENT] CPF/CNPJ inválido ignorado (length):', cleanedDoc.length);
      }
    }

    // Adicionar telefone se fornecido e válido
    if (requestData.phone) {
      const cleanedPhone = cleanPhone(requestData.phone);
      if (cleanedPhone.length >= 10 && cleanedPhone.length <= 11) {
        customerData.phone = cleanedPhone;
        console.log('📞 [ASAAS-PAYMENT] Telefone adicionado (length):', cleanedPhone.length);
      } else {
        console.log('⚠️ [ASAAS-PAYMENT] Telefone inválido ignorado (length):', cleanedPhone.length);
      }
    }

    console.log('👤 [ASAAS-PAYMENT] Dados do cliente preparados:', {
      ...customerData,
      cpfCnpj: customerData.cpfCnpj ? 'PRESENTE' : 'AUSENTE',
      phone: customerData.phone ? 'PRESENTE' : 'AUSENTE'
    });

    // Headers corretos para requisições do Asaas
    const asaasHeaders = {
      'access_token': ASAAS_API_KEY,
      'Content-Type': 'application/json',
      'User-Agent': 'Smartvoz/1.0'
    };

    console.log('🔍 [ASAAS-PAYMENT] Headers preparados para Asaas');

    // Primeiro, tentar buscar cliente existente por email
    console.log('🔍 [ASAAS-PAYMENT] Verificando se cliente já existe...');
    let customerId: string;

    try {
      const searchUrl = `https://www.asaas.com/api/v3/customers?email=${encodeURIComponent(customerData.email)}`;
      console.log('🔍 [ASAAS-PAYMENT] URL de busca:', searchUrl);
      
      const searchResponse = await fetch(searchUrl, {
        method: 'GET',
        headers: asaasHeaders
      });

      console.log('🔍 [ASAAS-PAYMENT] Status da busca:', searchResponse.status);
      console.log('🔍 [ASAAS-PAYMENT] Status text:', searchResponse.statusText);
      console.log('🔍 [ASAAS-PAYMENT] Headers da resposta:', Object.fromEntries(searchResponse.headers.entries()));

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        console.log('🔍 [ASAAS-PAYMENT] Resultado da busca:', {
          totalCount: searchResult.totalCount,
          hasData: !!searchResult.data,
          dataLength: searchResult.data?.length || 0
        });
        
        if (searchResult.data && searchResult.data.length > 0) {
          customerId = searchResult.data[0].id;
          console.log('✅ [ASAAS-PAYMENT] Cliente existente encontrado:', customerId);
        } else {
          // Cliente não existe, criar novo
          console.log('👤 [ASAAS-PAYMENT] Criando novo cliente no Asaas...');
          
          const customerResponse = await fetch('https://www.asaas.com/api/v3/customers', {
            method: 'POST',
            headers: asaasHeaders,
            body: JSON.stringify(customerData)
          });

          console.log('👤 [ASAAS-PAYMENT] Status da criação do cliente:', customerResponse.status);
          console.log('👤 [ASAAS-PAYMENT] Status text:', customerResponse.statusText);
          
          if (customerResponse.ok) {
            const customer = await customerResponse.json();
            customerId = customer.id;
            console.log('✅ [ASAAS-PAYMENT] Cliente criado com sucesso:', customerId);
          } else {
            const errorText = await customerResponse.text();
            console.error('❌ [ASAAS-PAYMENT] Erro ao criar cliente:', errorText);
            console.error('❌ [ASAAS-PAYMENT] Status:', customerResponse.status);
            console.error('❌ [ASAAS-PAYMENT] Headers de erro:', Object.fromEntries(customerResponse.headers.entries()));
            
            return new Response(
              JSON.stringify({ 
                error: { 
                  message: `Erro ao criar cliente no Asaas. Status: ${customerResponse.status}`,
                  details: errorText,
                  status_code: customerResponse.status
                } 
              }),
              { 
                status: 400, 
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
              }
            );
          }
        }
      } else {
        const searchErrorText = await searchResponse.text();
        console.error('❌ [ASAAS-PAYMENT] Erro ao buscar cliente - Status:', searchResponse.status);
        console.error('❌ [ASAAS-PAYMENT] Erro ao buscar cliente - Response:', searchErrorText);
        console.error('❌ [ASAAS-PAYMENT] Headers de erro:', Object.fromEntries(searchResponse.headers.entries()));
        
        // Verificar se é erro de autenticação
        if (searchResponse.status === 401) {
          console.error('🔐 [ASAAS-PAYMENT] ERRO DE AUTENTICAÇÃO - API Key pode estar incorreta');
          console.error('🔐 [ASAAS-PAYMENT] API Key format check:', {
            starts_with_dollar: ASAAS_API_KEY.startsWith('$'),
            length: ASAAS_API_KEY.length,
            preview: ASAAS_API_KEY.substring(0, 10) + '...'
          });
        }
        
        return new Response(
          JSON.stringify({ 
            error: { 
              message: `Erro de autenticação com Asaas. Verifique a API key. Status: ${searchResponse.status}`,
              details: searchErrorText,
              status_code: searchResponse.status,
              debug_info: {
                api_key_length: ASAAS_API_KEY.length,
                api_key_format: ASAAS_API_KEY.startsWith('$') ? 'SANDBOX' : 'PRODUCTION'
              }
            } 
          }),
          { 
            status: 401, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      }
    } catch (searchError) {
      console.error('❌ [ASAAS-PAYMENT] Exceção ao buscar/criar cliente:', searchError);
      console.error('❌ [ASAAS-PAYMENT] Tipo do erro:', typeof searchError);
      console.error('❌ [ASAAS-PAYMENT] Nome do erro:', searchError instanceof Error ? searchError.name : 'N/A');
      return new Response(
        JSON.stringify({ 
          error: { 
            message: 'Erro de conexão com o Asaas',
            details: searchError instanceof Error ? searchError.message : String(searchError)
          } 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Criar cobrança
    console.log('💰 [ASAAS-PAYMENT] Criando cobrança no Asaas...');
    
    const paymentData = {
      customer: customerId,
      billingType: 'PIX',
      value: requestData.value,
      dueDate: requestData.dueDate,
      description: 'Plano Smartvoz',
      ...(requestData.webhookUrl && { 
        externalReference: 'smartvoz_payment',
        postalService: false 
      })
    };

    console.log('💰 [ASAAS-PAYMENT] Dados da cobrança:', {
      customer: customerId,
      billingType: paymentData.billingType,
      value: paymentData.value,
      dueDate: paymentData.dueDate,
      hasWebhook: !!requestData.webhookUrl
    });

    const paymentResponse = await fetch('https://www.asaas.com/api/v3/payments', {
      method: 'POST',
      headers: asaasHeaders,
      body: JSON.stringify(paymentData)
    });

    console.log('💰 [ASAAS-PAYMENT] Resposta da cobrança - Status:', paymentResponse.status);
    console.log('💰 [ASAAS-PAYMENT] Resposta da cobrança - Status text:', paymentResponse.statusText);

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('❌ [ASAAS-PAYMENT] Erro ao criar cobrança:', errorText);
      console.error('❌ [ASAAS-PAYMENT] Status:', paymentResponse.status);
      console.error('❌ [ASAAS-PAYMENT] Headers de erro:', Object.fromEntries(paymentResponse.headers.entries()));
      
      return new Response(
        JSON.stringify({ 
          error: { 
            message: `Erro ao criar cobrança. Status: ${paymentResponse.status}`,
            details: errorText,
            status_code: paymentResponse.status
          } 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    const payment = await paymentResponse.json();
    console.log('✅ [ASAAS-PAYMENT] Cobrança criada com sucesso:', {
      id: payment.id,
      status: payment.status,
      hasInvoiceUrl: !!payment.invoiceUrl,
      hasPixQrCode: !!payment.pixQrCode
    });

    const successResponse = {
      customerId,
      paymentId: payment.id,
      invoiceUrl: payment.invoiceUrl,
      pixQrCode: payment.pixQrCode,
      status: payment.status
    };

    console.log('🎉 [ASAAS-PAYMENT] Sucesso! Retornando resposta:', {
      customerId,
      paymentId: payment.id,
      hasInvoiceUrl: !!payment.invoiceUrl
    });

    return new Response(
      JSON.stringify(successResponse),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('💥 [ASAAS-PAYMENT] Erro geral:', error);
    console.error('💥 [ASAAS-PAYMENT] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    console.error('💥 [ASAAS-PAYMENT] Tipo do erro:', typeof error);
    console.error('💥 [ASAAS-PAYMENT] Nome do erro:', error instanceof Error ? error.name : 'N/A');
    
    return new Response(
      JSON.stringify({ 
        error: { 
          message: 'Erro interno do servidor',
          details: error instanceof Error ? error.message : String(error),
          debug_info: {
            error_type: typeof error,
            error_name: error instanceof Error ? error.name : 'Unknown',
            timestamp: new Date().toISOString()
          }
        } 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
