
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ASAAS_API_URL = "https://api.asaas.com/v3";
const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Método não permitido", { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    console.log('🚀 Iniciando processamento da cobrança Asaas');
    
    if (!ASAAS_API_KEY) {
      console.error('❌ ASAAS_API_KEY não configurada');
      return new Response(JSON.stringify({ 
        error: { message: "Chave da API Asaas não configurada" }
      }), { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Verificar se há conteúdo no body
    const contentType = req.headers.get("content-type");
    console.log('📋 Content-Type:', contentType);

    if (!contentType || !contentType.includes("application/json")) {
      console.error('❌ Content-Type inválido:', contentType);
      return new Response(JSON.stringify({ 
        error: { message: "Content-Type deve ser application/json" }
      }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const bodyText = await req.text();
    console.log('📄 Body recebido:', bodyText);

    if (!bodyText || bodyText.trim() === '') {
      console.error('❌ Body vazio');
      return new Response(JSON.stringify({ 
        error: { message: "Body da requisição está vazio" }
      }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    let requestData;
    try {
      requestData = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('❌ Erro ao fazer parse do JSON:', parseError);
      return new Response(JSON.stringify({ 
        error: { message: "JSON inválido no body da requisição" }
      }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { name, email, cpfCnpj, phone, value, dueDate, webhookUrl, meta } = requestData;

    console.log('📋 Dados recebidos:', { name, email, value, dueDate });

    // Validar dados obrigatórios
    if (!name || !email || !value) {
      console.error('❌ Dados obrigatórios ausentes');
      return new Response(JSON.stringify({ 
        error: { message: "Nome, email e valor são obrigatórios" }
      }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // 1. Criar Cliente
    console.log('👤 Criando cliente no Asaas...');
    const clientRes = await fetch(`${ASAAS_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY!,
      },
      body: JSON.stringify({
        name,
        email,
        cpfCnpj: cpfCnpj || "",
        phone: phone || "",
        ...(meta ? { meta } : {})
      }),
    });

    const clientResponseText = await clientRes.text();
    console.log('👤 Resposta do cliente Asaas:', clientResponseText);

    if (!clientRes.ok) {
      let error;
      try {
        error = JSON.parse(clientResponseText);
      } catch {
        error = { message: "Erro ao criar cliente no Asaas" };
      }
      console.error('❌ Erro ao criar cliente:', error);
      return new Response(JSON.stringify({ error }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const client = JSON.parse(clientResponseText);
    const customerId = client.id;
    console.log('✅ Cliente criado:', customerId);

    // 2. Gerar cobrança
    console.log('💰 Gerando cobrança...');
    const chargeRes = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY!,
      },
      body: JSON.stringify({
        customer: customerId,
        billingType: "UNDEFINED", // Cliente escolhe
        dueDate: dueDate || new Date(Date.now() + 3*24*60*60*1000).toISOString().slice(0,10),
        value: Number(value),
        callback: webhookUrl,
        description: "Compra de Plano - Checkout Digital"
      }),
    });

    const chargeResponseText = await chargeRes.text();
    console.log('💰 Resposta da cobrança Asaas:', chargeResponseText);

    if (!chargeRes.ok) {
      let error;
      try {
        error = JSON.parse(chargeResponseText);
      } catch {
        error = { message: "Erro ao gerar cobrança no Asaas" };
      }
      console.error('❌ Erro ao gerar cobrança:', error);
      return new Response(JSON.stringify({ error }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const payment = JSON.parse(chargeResponseText);
    console.log('✅ Cobrança gerada:', payment.id);

    return new Response(JSON.stringify({
      invoiceUrl: payment.invoiceUrl,
      paymentId: payment.id,
      customerId,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (e) {
    console.error('💥 Erro interno:', e);
    return new Response(JSON.stringify({ 
      error: { message: `Erro interno do servidor: ${e.message}` }
    }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
