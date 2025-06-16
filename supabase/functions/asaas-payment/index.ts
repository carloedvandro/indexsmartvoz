
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
  console.log('🚀 Iniciando processamento da cobrança Asaas');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📋 Content-Type:', req.headers.get('content-type'));
    
    const body = await req.text();
    console.log('📄 Body recebido:', body);
    
    const requestData: PaymentRequest = JSON.parse(body);
    console.log('📋 Dados recebidos:', {
      name: requestData.name,
      email: requestData.email,
      value: requestData.value,
      dueDate: requestData.dueDate
    });

    const ASAAS_API_KEY = Deno.env.get('ASAAS_API_KEY');
    if (!ASAAS_API_KEY) {
      console.error('❌ ASAAS_API_KEY não configurada');
      return new Response(
        JSON.stringify({ error: { message: 'Configuração do pagamento não encontrada' } }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    console.log('🔑 ASAAS_API_KEY configurada');

    // Validar dados obrigatórios
    if (!requestData.name || requestData.name.trim().length < 2) {
      console.error('❌ Nome inválido:', requestData.name);
      return new Response(
        JSON.stringify({ error: { message: 'Nome deve ter pelo menos 2 caracteres' } }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    if (!requestData.email || !isValidEmail(requestData.email)) {
      console.error('❌ Email inválido:', requestData.email);
      return new Response(
        JSON.stringify({ error: { message: 'Email inválido' } }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Preparar dados do cliente para o Asaas
    console.log('👤 Preparando dados do cliente...');
    
    const customerData: any = {
      name: requestData.name.trim(),
      email: requestData.email.toLowerCase().trim()
    };

    // Adicionar CPF/CNPJ se fornecido e válido
    if (requestData.cpfCnpj) {
      const cleanedDoc = cleanDocument(requestData.cpfCnpj);
      if (cleanedDoc.length === 11 || cleanedDoc.length === 14) {
        customerData.cpfCnpj = cleanedDoc;
      }
    }

    // Adicionar telefone se fornecido e válido
    if (requestData.phone) {
      const cleanedPhone = cleanPhone(requestData.phone);
      if (cleanedPhone.length >= 10 && cleanedPhone.length <= 11) {
        customerData.phone = cleanedPhone;
      }
    }

    console.log('👤 Dados do cliente preparados:', customerData);

    // Headers para requisições do Asaas
    const asaasHeaders = {
      'access_token': ASAAS_API_KEY,
      'Content-Type': 'application/json',
      'User-Agent': 'Smartvoz/1.0'
    };

    // Primeiro, tentar buscar cliente existente por email
    console.log('🔍 Verificando se cliente já existe...');
    let customerId: string;

    try {
      const searchUrl = `https://www.asaas.com/api/v3/customers?email=${encodeURIComponent(customerData.email)}`;
      console.log('🔍 URL de busca:', searchUrl);
      
      const searchResponse = await fetch(searchUrl, {
        method: 'GET',
        headers: asaasHeaders
      });

      console.log('🔍 Status da busca:', searchResponse.status);

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        console.log('🔍 Resultado da busca:', searchResult);
        
        if (searchResult.data && searchResult.data.length > 0) {
          customerId = searchResult.data[0].id;
          console.log('✅ Cliente existente encontrado:', customerId);
        } else {
          // Cliente não existe, criar novo
          console.log('👤 Criando novo cliente no Asaas...');
          
          const customerResponse = await fetch('https://www.asaas.com/api/v3/customers', {
            method: 'POST',
            headers: asaasHeaders,
            body: JSON.stringify(customerData)
          });

          console.log('👤 Status da criação do cliente:', customerResponse.status);
          
          if (customerResponse.ok) {
            const customer = await customerResponse.json();
            customerId = customer.id;
            console.log('✅ Cliente criado com sucesso:', customerId);
          } else {
            const errorText = await customerResponse.text();
            console.error('❌ Erro ao criar cliente:', errorText);
            
            try {
              const errorData = JSON.parse(errorText);
              console.error('❌ Detalhes do erro:', errorData);
              
              return new Response(
                JSON.stringify({ 
                  error: { 
                    message: `Erro ao criar cliente: ${errorData.errors?.[0]?.description || 'Dados inválidos'}` 
                  } 
                }),
                { 
                  status: 400, 
                  headers: { 'Content-Type': 'application/json', ...corsHeaders }
                }
              );
            } catch {
              return new Response(
                JSON.stringify({ error: { message: 'Erro ao processar dados do cliente' } }),
                { 
                  status: 400, 
                  headers: { 'Content-Type': 'application/json', ...corsHeaders }
                }
              );
            }
          }
        }
      } else {
        const searchErrorText = await searchResponse.text();
        console.error('❌ Erro ao buscar cliente - Status:', searchResponse.status);
        console.error('❌ Erro ao buscar cliente - Response:', searchErrorText);
        
        // Se a busca falhar, tentar criar cliente diretamente
        console.log('👤 Busca falhou, tentando criar cliente diretamente...');
        
        const customerResponse = await fetch('https://www.asaas.com/api/v3/customers', {
          method: 'POST',
          headers: asaasHeaders,
          body: JSON.stringify(customerData)
        });

        if (customerResponse.ok) {
          const customer = await customerResponse.json();
          customerId = customer.id;
          console.log('✅ Cliente criado com sucesso após falha na busca:', customerId);
        } else {
          const createErrorText = await customerResponse.text();
          console.error('❌ Erro ao criar cliente após falha na busca:', createErrorText);
          
          return new Response(
            JSON.stringify({ error: { message: 'Erro ao processar cliente no Asaas' } }),
            { 
              status: 400, 
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            }
          );
        }
      }
    } catch (searchError) {
      console.error('❌ Exceção ao buscar/criar cliente:', searchError);
      return new Response(
        JSON.stringify({ error: { message: 'Erro de conexão com o Asaas' } }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Criar cobrança
    console.log('💰 Criando cobrança no Asaas...');
    
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

    console.log('💰 Dados da cobrança:', paymentData);

    const paymentResponse = await fetch('https://www.asaas.com/api/v3/payments', {
      method: 'POST',
      headers: asaasHeaders,
      body: JSON.stringify(paymentData)
    });

    console.log('💰 Resposta da cobrança Asaas:', paymentResponse.status);

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('❌ Erro ao criar cobrança:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        console.error('❌ Detalhes do erro da cobrança:', errorData);
        
        return new Response(
          JSON.stringify({ 
            error: { 
              message: `Erro ao criar cobrança: ${errorData.errors?.[0]?.description || 'Erro desconhecido'}` 
            } 
          }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      } catch {
        return new Response(
          JSON.stringify({ error: { message: 'Erro ao criar cobrança' } }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      }
    }

    const payment = await paymentResponse.json();
    console.log('✅ Cobrança criada com sucesso:', payment.id);

    return new Response(
      JSON.stringify({
        customerId,
        paymentId: payment.id,
        invoiceUrl: payment.invoiceUrl,
        pixQrCode: payment.pixQrCode,
        status: payment.status
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('💥 Erro geral:', error);
    return new Response(
      JSON.stringify({ 
        error: { 
          message: 'Erro interno do servidor',
          details: error.message 
        } 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
