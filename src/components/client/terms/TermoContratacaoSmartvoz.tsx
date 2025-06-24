
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TermoContratacaoSmartvoz = () => {
  const [aceito, setAceito] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Termo de contratação digital – serviço de linha pré-paga com renovação mensal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <p className="text-sm">
              Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo.
            </p>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">1. Objeto do serviço</h2>
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
                <li>É expressamente proibido:
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>Vincular a linha a cadastros em WhatsApp, aplicativos bancários, redes sociais ou como número pessoal/profissional;</li>
                    <li>Realizar portabilidade, transferência de titularidade ou revenda não autorizada.</li>
                  </ul>
                </li>
                <li>O número da linha permanece sob controle exclusivo da SmartVoz, podendo ser reatribuído, desativado ou modificado a qualquer tempo.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">3. Pagamento e vigência</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>O valor do plano será informado previamente ao pagamento, sendo válido por 30 dias corridos a partir da ativação.</li>
                <li>O pagamento é antecipado e não reembolsável, mesmo em casos de uso parcial, desistência ou interrupção.</li>
                <li>O não pagamento até a data prevista resultará no bloqueio automático da linha, sem aviso prévio.</li>
                <li>O sistema reserva automaticamente o valor da mensalidade para impedir saques antes da renovação do plano.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">4. Comissões e conduta em rede</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Usuários podem receber comissões recorrentes por meio de links de indicação.</li>
                <li>É proibido divulgar a operadora real ou fazer menções ofensivas em redes sociais, sob risco de penalidades como perda de rede e desativação da conta.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-3 text-gray-900">5. Suporte técnico</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Suporte técnico 24h por dia, todos os dias, via central da operadora (ligação para 10315 &gt; opção 2 &gt; opção 2 novamente &gt; digitar código de acesso de 4 dígitos).</li>
                <li>Caso o código não seja reconhecido na primeira tentativa, repita na segunda tentativa.</li>
                <li>Será solicitado o CNPJ da empresa; o usuário deve informar que é apenas um usuário com código de acesso fornecido pela SmartVoz.</li>
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
                  <li>Acompanhamento de consumo pelo app da operadora (via código SMS de 6 dígitos)</li>
                  <li>Possibilidade de upgrade de plano ou pergunta de plano</li>
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
                <label htmlFor="aceito" className="text-sm font-medium">
                  Declaro que li e aceito todos os termos.
                </label>
              </div>
              
              <Button
                disabled={!aceito || enviando}
                onClick={handleAceite}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {enviando ? "Processando..." : "Aceitar e Prosseguir"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvoz;
