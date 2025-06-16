
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

    // Criar ou buscar cliente no Asaas
    console.log('👤 Criando cliente no Asaas...');
    
    const customerData = {
      name: requestData.name,
      email: requestData.email,
      ...(requestData.cpfCnpj && { cpfCnpj: requestData.cpfCnpj }),
      ...(requestData.phone && { phone: requestData.phone })
    };

    const customerResponse = await fetch('https://www.asaas.com/api/v3/customers', {
      method: 'POST',
      headers: {
        'access_token': ASAAS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });

    console.log('👤 Resposta do cliente Asaas:', customerResponse.status);
    
    let customerId: string;
    
    if (customerResponse.ok) {
      const customer = await customerResponse.json();
      customerId = customer.id;
      console.log('✅ Cliente criado com sucesso:', customerId);
    } else {
      const errorText = await customerResponse.text();
      console.log('⚠️ Erro ao criar cliente, tentando buscar existente:', errorText);
      
      // Se falhou ao criar, tenta buscar cliente existente por email
      const searchResponse = await fetch(`https://www.asaas.com/api/v3/customers?email=${requestData.email}`, {
        headers: {
          'access_token': ASAAS_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        if (searchResult.data && searchResult.data.length > 0) {
          customerId = searchResult.data[0].id;
          console.log('✅ Cliente existente encontrado:', customerId);
        } else {
          console.error('❌ Cliente não encontrado e não foi possível criar');
          return new Response(
            JSON.stringify({ error: { message: 'Erro ao processar dados do cliente' } }),
            { 
              status: 400, 
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            }
          );
        }
      } else {
        console.error('❌ Erro ao buscar cliente existente');
        return new Response(
          JSON.stringify({ error: { message: 'Erro ao processar dados do cliente' } }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      }
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

    const paymentResponse = await fetch('https://www.asaas.com/api/v3/payments', {
      method: 'POST',
      headers: {
        'access_token': ASAAS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    console.log('💰 Resposta da cobrança Asaas:', paymentResponse.status);

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('❌ Erro ao criar cobrança:', errorText);
      return new Response(
        JSON.stringify({ error: { message: 'Erro ao criar cobrança' } }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
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
      JSON.stringify({ error: { message: 'Erro interno do servidor' } }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
