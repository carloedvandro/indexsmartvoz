
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TermoContratacaoSmartvozProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

const TermoContratacaoSmartvoz = ({ acceptedTerms, onTermsChange }: TermoContratacaoSmartvozProps) => {
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleAceite = async () => {
    try {
      setEnviando(true);
      
      // Registrar aceite via Edge Function
      const { error } = await supabase.functions.invoke('registro-termo', {
        body: {
          aceite: true,
          receberComunicados: true
        }
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Aceite registrado com sucesso.",
      });
      
      onTermsChange(true);
    } catch (error) {
      console.error('Erro ao registrar aceite:', error);
      toast({
        title: "Erro",
        description: "Erro ao registrar o aceite. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    console.log('📝 Checkbox alterado:', checked);
    onTermsChange(checked);
  };

  return (
    <div className="space-y-6 mt-[90px]">
      <div className="w-full flex justify-center mb-4">
        
      </div>
      
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#8425af] mb-4">Termos de contrato</h2>
        <p className="text-gray-600 mb-4" style={{ fontSize: '16.5px' }}>
          Ao concluir a solicitação, você confirma que todos os dados são verdadeiros e estão em perfeita
          conformidade com os termos a seguir:
        </p>
        
        {/* Conteúdo completo dos termos */}
        <div className="bg-white p-6 text-gray-800 font-sans max-h-96 overflow-y-auto text-left mb-6 border rounded-lg">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-start mb-6">
              <h1 className="text-lg font-semibold text-left">
                Termo de contratação digital – serviço de linha pré-paga com renovação mensal
              </h1>
            </div>

            <p className="mb-4">
              Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo.
            </p>

            <h2 className="font-bold text-lg mb-2">1. Objetivo do serviço</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Disponibilização de linha de telefonia móvel sob modelo pré-pago, gerenciado pela empresa SmartVoz.</li>
              <li>O USUÁRIO não é o titular da linha, sendo apenas um usuário temporário com vigência mensal renovável.</li>
              <li>O serviço é fornecido por ciclos de 30 (trinta) dias, condicionado ao pagamento antecipado do plano contratado.</li>
            </ul>

            <h2 className="font-bold text-lg mb-2">2. Uso da linha e limitações</h2>
            <ul className="list-disc list-inside mb-4">
              <li>O uso é restrito a dados móveis e recursos básicos (como chamadas e SMS), conforme o plano adquirido.</li>
              <li>É expressamente proibido:</li>
              <li className="ml-6">Vincular a linha a cadastros em WhatsApp, aplicativos bancários, redes sociais ou como número pessoal/profissional;</li>
              <li className="ml-6">Realizar portabilidade, transferência de titularidade ou revenda não autorizada.</li>
              <li>O número da linha permanece sob controle exclusivo da SmartVoz, podendo ser reatribuído, desativado ou modificado a qualquer tempo.</li>
            </ul>

            <h2 className="font-bold text-lg mb-2">3. Pagamento e vigência</h2>
            <ul className="list-disc list-inside mb-4">
              <li>O valor do plano será informado previamente ao pagamento, e o usuário deverá realizar o pagamento antes de seguir para as etapas de escaneamento do chip e solicitação de ativação da linha.</li>
              <li>O pagamento é antecipado e não reembolsável, mesmo em casos de uso parcial, desistência ou interrupção.</li>
              <li>O não pagamento até a data prevista resultará no bloqueio automático da linha, sem aviso prévio.</li>
              <li>O sistema reserva automaticamente o valor total da mensalidade a vencer. Caso o usuário tenha saldo disponível, esse valor será retido antes de permitir novos saques. Se o saldo for insuficiente, a fatura será atualizada com o valor restante com desconto proporcional e o usuário será notificado. O sistema também poderá aplicar automaticamente créditos disponíveis e gerar nova fatura atualizada.</li>
            </ul>

            <h2 className="font-bold text-lg mb-2">4. Comissões e conduta em rede</h2>
            <ul className="list-disc list-inside mb-4">
              <li>O usuário receberá comissões de forma recorrente sobre todos os cadastros realizados por meio do seu link de indicação.</li>
              <li>É proibido divulgar os planos da empresa SmartVoz mencionando concorrentes ou operadoras reais, bem como fazer publicações ofensivas ou discriminatórias em mídias sociais. Tais práticas podem resultar em penalidades como advertência, perda da rede ou exclusão da conta.</li>
            </ul>

            <h2 className="font-bold text-lg mb-2">5. Suporte técnico</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Suporte técnico disponível 24 horas por dia, de segunda a segunda, por meio de ligação para a central 10315.</li>
              <li>Selecione a opção 2, aguarde e selecione novamente a opção 2. Após isso, será solicitado que digite o código de acesso de 4 dígitos fornecido pela SmartVoz.</li>
              <li>Na primeira tentativa, o código pode não ser reconhecido. Após a notificação, tente novamente o mesmo código.</li>
              <li>Caso o atendimento solicite dados da empresa, informe que você é apenas um usuário com o código de acesso fornecido.</li>
            </ul>

            <h2 className="font-bold text-lg mb-2">6. Comunicação e notificações</h2>
            <ul className="list-disc list-inside mb-4">
              <li>O USUÁRIO será notificado no painel do escritório virtual (Dashboard) via sino com mensagens sobre:</li>
              <ul className="list-disc ml-6">
                <li>Vencimento da fatura</li>
                <li>Status da ativação da linha</li>
                <li>Instruções operacionais sobre ativação do SIM Card ou eSIM (leitura de QR Code)</li>
                <li>Acompanhamento de consumo pelo app da operadora (via código SMS de 6 dígitos)</li>
                <li>Possibilidade de upgrade de plano ou pergunte de plano</li>
              </ul>
            </ul>

            <h2 className="font-bold text-lg mb-2">7. Cadastro e validação</h2>
            <ul className="list-disc list-inside mb-4">
              <li>O cadastro é individual por CPF, com validação biométrica facial, escaneamento de documento (frente e verso) e confirmação por dois fatores.</li>
              <li>Não é permitido o cadastro em nome de terceiros ou duplicações por CPF, e-mail ou número de contato.</li>
            </ul>

            <h2 className="font-bold text-lg mb-2">8. Disposições finais</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Este serviço é prestado exclusivamente pela SmartVoz, sem vínculo direto com operadoras de telefonia.</li>
              <li>Este termo substitui quaisquer comunicações anteriores.</li>
              <li>O foro para eventuais disputas será Porto Alegre/RS.</li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 text-left ml-[12px]">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer w-[calc(100%+7px)] pl-1 mt-[1.25px]">
            Aceito receber comunicações e ofertas da Smartvoz.
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvoz;
