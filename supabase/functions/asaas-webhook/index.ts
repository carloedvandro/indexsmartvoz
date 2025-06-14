
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Valide a origem com o header 'asaas-signature', se preferir maior segurança (doc oficial)
 * Aqui só exemplo, ideal guardar o log/activity.
 */

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 });
  }

  try {
    const event = await req.json();

    // Exemplo de log - customize conforme seu modelo de database ou lógica
    console.log("Recebido Webhook Asaas:", event);

    if (event.event === "PAYMENT_CONFIRMED") {
      // Salvar confirmação! No seu caso, ajuste para atualizar/salvar no banco de dados Supabase, exemplo:
      // const paymentId = event.payment.id;
      // Atualize um pedido local para status: confirmado
      // TODO: Implementar integração com a tabela de pedidos local
      // Notificar usuário, liberar plano, etc
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Erro interno na tratativa do webhook", { status: 500 });
  }
});
