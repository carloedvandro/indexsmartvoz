
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function TermsContent() {
  const { toast } = useToast();

  const Secao = ({ titulo, children }) => (
    <div className="mb-4">
      <h2 className="text-md font-bold text-left text-purple-700 mb-1">{titulo}</h2>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <div className="p-6 space-y-4 text-sm leading-relaxed text-gray-700">
      <div className="bg-white p-6 text-gray-800 font-sans">
        <div className="max-w-3xl mx-auto">
          <Secao titulo="1. Objetivo do serviço">
            Disponibilização de linha de telefonia móvel no modelo pré-pago, com vigência mensal e renovação mediante pagamento.
          </Secao>

          <Secao titulo="2. Uso da linha e limitações">
            O uso é restrito a dados móveis e recursos básicos (chamadas e SMS), conforme o plano contratado. É proibido:
            <ul className="list-disc ml-6">
              <li>Vincular a linha a serviços bancários, WhatsApp, redes sociais ou como número pessoal/profissional;</li>
              <li>Realizar portabilidade, revenda ou transferência de titularidade não autorizada.</li>
            </ul>
          </Secao>

          <Secao titulo="3. Cadastro">
            O cadastro será feito por CPF individual com validação facial e biometria. É necessário escaneamento de documento frente e verso, validação de número de telefone e e-mail único por CPF. Acessos são verificados com múltiplos fatores e dados não podem ser duplicados.
          </Secao>

          <Secao titulo="4. Pagamento e Vigência">
            O valor do plano será informado previamente. O pagamento é antecipado e não reembolsável. O sistema poderá reservar automaticamente o valor da fatura até 10 dias antes do vencimento. Se o saldo for insuficiente, será gerada nova fatura com valor proporcional ajustado. O sistema poderá aplicar créditos disponíveis para gerar fatura com desconto. Taxa de 3% poderá ser aplicada sobre cada saque.
          </Secao>

          <Secao titulo="5. Segurança">
            O usuário é responsável pela guarda de suas credenciais. Em caso de perda ou uso indevido, comunique a SmartVoz. Nunca forneça senhas por telefone ou e-mail. Use antivírus atualizado.
          </Secao>

          <Secao titulo="6. Suporte Técnico e Comunicação">
            O suporte técnico está disponível 24h/dia, de segunda a segunda, via ligação para 10315 &gt; opção 2 &gt; opção 2 novamente &gt; código de 4 dígitos. Caso não reconhecido na primeira tentativa, repita na segunda. Atendimento básico será prestado com base no código individual fornecido.
            Comunicações são feitas por notificações no dashboard, e-mail e WhatsApp após aceite.
          </Secao>

          <Secao titulo="7. Comissões e Conduta">
            O usuário pode divulgar o serviço via link pessoal e receber comissões recorrentes. É proibido comparar planos ou desinformar sobre operadoras como Vivo, Claro, TIM e demais operadoras do mercado. Violações poderão resultar em advertência, suspensão da conta, exclusão da rede e responsabilização judicial conforme Código de Defesa do Consumidor e regras do marketing multinível.
          </Secao>

          <Secao titulo="8. Aplicativo de acompanhamento">
            Disponível app da operadora para acompanhamento em tempo real da franquia. O usuário acessa com código SMS de 6 dígitos vinculado à linha contratada. Permite acompanhar uso de dados, porcentagem e solicitar upgrade de plano a qualquer momento com cobrança na próxima fatura.
          </Secao>

          <Secao titulo="9. Política de Privacidade">
            A SmartVoz pode alterar esta política a qualquer momento. Consulte regularmente www.smartvoz.com.br para atualizações.
          </Secao>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Ao contratar e ativar o serviço, o USUÁRIO confirma o aceite integral deste Termo de Contratação Digital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
