
export function TermsContent() {
  return (
    <div className="p-6 space-y-4 text-sm leading-relaxed text-gray-700">
      <p className="mb-4">
        Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. 
        Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo, 
        em conformidade com o Código de Defesa do Consumidor (Lei nº 8.078/1990), Código Civil (Art. 186 e 927), 
        Marco Civil da Internet (Lei 12.965/2014) e a Lei 6.019/1974 (Marketing Multinível).
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-base mb-2">1. Objetivo do serviço</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Disponibilização de linha de telefonia móvel sob modelo pré-pago, gerenciado pela empresa SmartVoz.</li>
            <li>O USUÁRIO não é o titular da linha, sendo apenas um usuário temporário com vigência mensal renovável.</li>
            <li>O serviço é fornecido por ciclos de 30 (trinta) dias, condicionado ao pagamento antecipado do plano contratado.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">2. Uso da linha e limitações</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>O uso é restrito a dados móveis e recursos básicos (como chamadas e SMS), conforme o plano adquirido.</li>
            <li>É expressamente proibido:</li>
            <li className="ml-6">Vincular a linha a cadastros em WhatsApp, aplicativos bancários, redes sociais ou como número pessoal/profissional;</li>
            <li className="ml-6">Realizar portabilidade, transferência de titularidade ou revenda não autorizada.</li>
            <li>O número da linha permanece sob controle exclusivo da SmartVoz, podendo ser reatribuído, desativado ou modificado a qualquer tempo.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">3. Pagamento e vigência</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>O valor do plano será informado previamente ao pagamento, e o usuário deverá realizar o pagamento antes de seguir para as etapas de escaneamento do chip e solicitação de ativação da linha.</li>
            <li>O pagamento é antecipado e não reembolsável, mesmo em casos de uso parcial, desistência ou interrupção.</li>
            <li>O sistema poderá aplicar automaticamente créditos disponíveis para gerar a fatura com desconto e informar o novo valor ajustado ao usuário.</li>
            <li>O sistema não bloqueará ou reservará valores de comissão recebida fora do período de 10 dias antes do vencimento da mensalidade. Dentro desse intervalo de 10 dias, o valor da fatura poderá ser reservado automaticamente e o restante do saldo permanece disponível para saque.</li>
            <li>Será aplicada taxa de 3% sobre cada solicitação de saque efetuada.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">4. Comissões e conduta em rede</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>O usuário receberá comissões de forma recorrente sobre todos os cadastros realizados por meio do seu link de indicação.</li>
            <li>É expressamente proibido divulgar comparações entre planos da SmartVoz e os planos das operadoras concorrentes (como Vivo, Claro, TIM e demais operadoras do mercado), inclusive em mídias sociais ou canais digitais, com o intuito de desinformar, depreciar ou difamar.</li>
            <li>O usuário não poderá usar campanhas, marcas ou materiais das operadoras fornecedoras para fins de propaganda sem autorização formal da SmartVoz.</li>
            <li>O descumprimento dessas regras poderá resultar em penalidades como advertência, exclusão da conta, bloqueio da rede de comissões, responsabilização judicial por danos morais e materiais, conforme previsto nas leis mencionadas neste termo.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">5. Suporte técnico</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Disponível 24h por dia, de segunda a segunda, via ligação para 10315.</li>
            <li>Selecione a opção 2, aguarde, selecione novamente a opção 2, e digite o código de acesso de 4 dígitos fornecido pela SmartVoz.</li>
            <li>Na primeira tentativa, o código pode não ser reconhecido. Após a notificação, digite novamente o mesmo código.</li>
            <li>Informe que é apenas o usuário autorizado com acesso por meio do código de 4 dígitos.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">6. Comunicação e notificações</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>O USUÁRIO será notificado no painel do escritório virtual (Dashboard), via sino, e também por e-mail e WhatsApp, sobre:</li>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Confirmação do aceite do termo (com IP, data e hora)</li>
              <li>Vencimento da fatura</li>
              <li>Status da ativação da linha</li>
              <li>Instruções operacionais sobre ativação do SIM Card e eSIM (leitura de QR Code)</li>
              <li>Opção de upgrade de plano a qualquer momento (com cobrança atualizada na próxima fatura)</li>
              <li>Disponibilidade de acesso ao app da operadora para acompanhar o plano contratado em tempo real via linha cadastrada e código de SMS de 6 dígitos</li>
            </ul>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">7. Cadastro e validação</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Cadastro individual por CPF com validação facial, escaneamento de documento frente/verso e confirmação em dois fatores.</li>
            <li>Não será permitido cadastro em nome de terceiros, nem duplicações por CPF, e-mail ou número de contato.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-2">8. Disposições finais</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Este serviço é prestado exclusivamente pela SmartVoz, sem vínculo direto com operadoras de telefonia.</li>
            <li>Este termo substitui qualquer comunicação anterior.</li>
            <li>O foro competente para dirimir eventuais dúvidas é o da Comarca de Porto Alegre – RS.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
