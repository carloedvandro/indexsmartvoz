
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

    const { name, email, cpfCnpj, phone, value, dueDate, webhookUrl, meta } = await req.json();

    console.log('📋 Dados recebidos:', { name, email, value, dueDate });

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
        cpfCnpj,
        phone,
        ...(meta ? { meta } : {})
      }),
    });

    if (!clientRes.ok) {
      const error = await clientRes.json();
      console.error('❌ Erro ao criar cliente:', error);
      return new Response(JSON.stringify({ error }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const client = await clientRes.json();
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

    if (!chargeRes.ok) {
      const error = await chargeRes.json();
      console.error('❌ Erro ao gerar cobrança:', error);
      return new Response(JSON.stringify({ error }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const payment = await chargeRes.json();
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
      error: { message: "Erro interno do servidor" }
    }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
