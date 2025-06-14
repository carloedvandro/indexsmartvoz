
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ASAAS_API_URL = "https://api.asaas.com/v3";
const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 });
  }

  try {
    const { name, email, cpfCnpj, phone, value, dueDate, webhookUrl, meta } = await req.json();

    // 1. Criar Cliente
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
        ...(meta ? { // para custom usage
          meta,
        } : {})
      }),
    });

    if (!clientRes.ok) {
      const error = await clientRes.json();
      return new Response(JSON.stringify({ error }), { status: 400 });
    }
    const client = await clientRes.json();
    const customerId = client.id;

    // 2. Gerar cobrança
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
      return new Response(JSON.stringify({ error }), { status: 400 });
    }
    const payment = await chargeRes.json();

    return new Response(JSON.stringify({
      invoiceUrl: payment.invoiceUrl,
      paymentId: payment.id,
      customerId,
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    console.error(e);
    return new Response("Erro interno", { status: 500 });
  }
});
