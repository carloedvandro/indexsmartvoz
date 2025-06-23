
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const TermoContratacaoSmartvozUpdated = () => {
  const [aceito, setAceito] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleAceite = async () => {
    try {
      setEnviando(true);
      
      console.log('🔄 Tentando registrar aceite dos termos...');
      
      // Verificar se o usuário está logado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuário não está logado');
      }

      console.log('✅ Usuário logado, enviando aceite...');
      
      // Registrar aceite via Edge Function
      const { data, error } = await supabase.functions.invoke('registro-termo', {
        body: {
          aceite: true,
          receberComunicados: true
        }
      });

      console.log('📤 Resposta da função:', { data, error });

      if (error) {
        console.error('❌ Erro na função:', error);
        throw error;
      }

      console.log('✅ Aceite registrado com sucesso');
      
      toast({
        title: "Sucesso",
        description: "Aceite registrado com sucesso.",
      });
      
    } catch (error) {
      console.error('❌ Erro ao registrar aceite:', error);
      toast({
        title: "Erro",
        description: "Erro ao registrar o aceite. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#8425af]">
              Termo de contratação digital – serviço de linha pré-paga com renovação mensal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <p className="text-sm">
              Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. 
              Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo.
            </p>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">1. Objetivo do serviço</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Disponibilização de linha de telefonia móvel sob modelo pré-pago, gerenciado pela empresa SmartVoz.</li>
                <li>O USUÁRIO não é o titular da linha, sendo apenas um usuário temporário com vigência mensal renovável.</li>
                <li>O serviço é fornecido por ciclos de 30 (trinta) dias, condicionado ao pagamento antecipado do plano contratado.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">2. Uso da linha e limitações</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>O uso é restrito a dados móveis e recursos básicos (como chamadas e SMS), conforme o plano adquirido.</li>
                <li>É expressamente proibido:</li>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Vincular a linha a cadastros em WhatsApp, aplicativos bancários, redes sociais ou como número pessoal/profissional;</li>
                  <li>Realizar portabilidade, transferência de titularidade ou revenda não autorizada.</li>
                </ul>
                <li>O número da linha permanece sob controle exclusivo da SmartVoz, podendo ser reatribuído, desativado ou modificado a qualquer tempo.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">3. Pagamento e vigência</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>O valor do plano será informado previamente ao pagamento, e o usuário deverá realizar o pagamento antes de seguir para as etapas de escaneamento do chip e solicitação de ativação da linha.</li>
                <li>O pagamento é antecipado e não reembolsável, mesmo em casos de uso parcial, desistência ou interrupção.</li>
                <li>O não pagamento até a data prevista resultará no bloqueio automático da linha, sem aviso prévio.</li>
                <li>O sistema reserva automaticamente o valor total da mensalidade a vencer. Caso o usuário tenha saldo disponível, esse valor será retido antes de permitir novos saques. Se o saldo for insuficiente, a fatura será atualizada com o valor restante com desconto proporcional e o usuário será notificado. O sistema também poderá aplicar automaticamente créditos disponíveis e gerar nova fatura atualizada.</li>
                <li>Será cobrada taxa de 3% sobre cada solicitação de saque, quando aplicável.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">4. Comissões e conduta em rede</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>O usuário receberá comissões de forma recorrente sobre todos os cadastros realizados por meio do seu link de indicação.</li>
                <li>É proibido divulgar os planos da empresa SmartVoz mencionando concorrentes ou operadoras reais, bem como fazer publicações ofensivas ou discriminatórias em mídias sociais. Tais práticas podem resultar em penalidades como advertência, perda da rede ou exclusão da conta.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">5. Suporte técnico</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Suporte técnico disponível 24 horas por dia, de segunda a segunda, por meio de ligação para a central 10315.</li>
                <li>Selecione a opção 2, aguarde e selecione novamente a opção 2. Após isso, será solicitado que digite o código de acesso de 4 dígitos fornecido pela SmartVoz.</li>
                <li>Na primeira tentativa, o código pode não ser reconhecido. Após a notificação, tente novamente o mesmo código.</li>
                <li>Caso o atendimento solicite dados da empresa, informe que você é apenas um usuário com o código de acesso fornecido pela empresa. Explique o motivo do contato (ex: lentidão na linha, necessidade de atualização, etc.).</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">6. Comunicação e notificações</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>O USUÁRIO será notificado no painel do escritório virtual (Dashboard) via sino com mensagens sobre:</li>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Vencimento da fatura</li>
                  <li>Status da ativação da linha</li>
                  <li>Instruções operacionais sobre ativação do SIM Card ou eSIM (leitura de QR Code)</li>
                  <li>Disponibilidade do aplicativo da operadora para acompanhamento do plano contratado e consumo de dados. O usuário fará o download do app indicado no dashboard, inserirá sua linha, receberá código SMS de 6 dígitos e terá acesso ao consumo em tempo real e percentual atingido. Caso deseje, poderá solicitar upgrade de plano para o próximo ciclo.</li>
                  <li>Opção de upgrade de plano a qualquer momento. O valor atualizado será cobrado na próxima fatura.</li>
                </ul>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">7. Cadastro e validação</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>O cadastro é individual por CPF, com validação biométrica facial, escaneamento de documento (frente e verso) e confirmação por dois fatores.</li>
                <li>Não é permitido o cadastro em nome de terceiros ou duplicações por CPF, e-mail ou número de contato.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">8. Disposições finais</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Este serviço é prestado exclusivamente pela SmartVoz, sem vínculo direto com operadoras de telefonia.</li>
                <li>Este termo substitui quaisquer comunicações anteriores.</li>
                <li>O foro para eventuais disputas será Porto Alegre/RS.</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="aceito"
                  checked={aceito}
                  onCheckedChange={(checked) => setAceito(checked as boolean)}
                />
                <label htmlFor="aceito" className="text-sm font-medium cursor-pointer">
                  Declaro que li e aceito todos os termos.
                </label>
              </div>
              
              <Button
                disabled={!aceito || enviando}
                onClick={handleAceite}
                className="w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              >
                {enviando ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Aceitar e Prosseguir"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvozUpdated;
