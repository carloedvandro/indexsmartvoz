
export function TermsContent() {
  return (
    <div className="p-6 space-y-4 text-sm leading-relaxed text-gray-700">
      <p className="mb-4">
        Este documento estabelece as condições para fornecimento de serviço de linha móvel pela empresa SmartVoz. Ao prosseguir, o usuário declara que leu e aceita os termos, conforme as legislações aplicáveis:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Código de Defesa do Consumidor – Lei nº 8.078/1990</li>
        <li>Marco Civil da Internet – Lei nº 12.965/2014</li>
        <li>Código Civil – arts. 186 e 927</li>
        <li>Lei de Marketing Multinível – Lei nº 6.019/1974</li>
      </ul>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-base mb-2">1. Objetivo do serviço</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Disponibilização de linha móvel pré-paga gerenciada pela SmartVoz.</li>
            <li>O usuário é apenas um utilizador temporário, com vigência mensal renovável.</li>
            <li>Uso limitado ao plano contratado, válido por 30 dias, condicionado a pagamento antecipado.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">2. Uso e limitações</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Proibido: portabilidade, revenda não autorizada, uso como número pessoal/profissional em apps como WhatsApp ou bancos.</li>
            <li>O número poderá ser desativado ou modificado a qualquer tempo.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">3. Pagamento e vigência</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>O valor será informado antes do pagamento, que é antecipado e não reembolsável.</li>
            <li>Pagamento obrigatório antes do escaneamento e ativação.</li>
            <li>O sistema reserva o valor da mensalidade apenas 10 dias antes do vencimento. Antes disso, o saque é livre.</li>
            <li>Créditos disponíveis poderão ser usados para abater o valor da fatura automaticamente.</li>
            <li>Taxa de 3% será aplicada em cada solicitação de saque.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">4. Comissões e conduta</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Usuário recebe comissões pelos cadastros via link de indicação pessoal.</li>
            <li>É proibido comparar ou difamar operadoras como Vivo, Claro, TIM ou demais concorrentes.</li>
            <li>Divulgação de campanhas ou logos sem autorização é vedada.</li>
            <li>Sanções: bloqueio de conta, suspensão de comissões, exclusão e responsabilização judicial.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">5. Suporte técnico</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Disponível 24h via ligação para 10315:</li>
            <li className="ml-6">Passos: opção 2 → opção 2 novamente → código de 4 dígitos</li>
            <li className="ml-6">Se não reconhecido: tente novamente após notificação</li>
            <li className="ml-6">Atendimento: usuário informa que possui código fornecido e solicita suporte técnico</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">6. Comunicação e notificações</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Confirmação via WhatsApp, e-mail e dashboard:</li>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Aceite do termo com IP, data/hora</li>
              <li>Status da linha, fatura, ativação e upgrade</li>
              <li>Acesso ao app oficial da operadora para acompanhamento do plano</li>
            </ul>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">7. Cadastro e validação</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Cadastro via CPF único, com validação facial, documento e selfie.</li>
            <li>Proibido duplicar cadastros por e-mail, WhatsApp ou CPF.</li>
            <li>Feito no site: www.smartvoz.com.br</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">8. Segurança</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Senhas são pessoais. Não compartilhe.</li>
            <li>Comunique perdas ou acessos indevidos.</li>
            <li>A SmartVoz nunca solicita senhas por canais externos.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">9. Política de privacidade</h3>
          <p className="text-sm">
            A SmartVoz poderá alterar esta política a qualquer momento. Consulte regularmente o site oficial.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">10. Disposições finais</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Serviço prestado unicamente pela SmartVoz, sem vínculo com operadoras.</li>
            <li>Termo substitui qualquer versão anterior.</li>
            <li>Foro: Comarca de Porto Alegre – RS.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
