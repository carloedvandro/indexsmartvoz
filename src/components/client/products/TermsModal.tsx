
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (accepted: boolean) => void;
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
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
      
      if (onAccept) {
        onAccept(true);
      }
      
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-xl font-bold text-[#8425af]">
            Termo de contratação digital – serviço de linha pré-paga com renovação mensal
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full max-h-[60vh]">
            <div className="p-6 space-y-4 text-sm leading-relaxed text-gray-700">
              <p className="mb-4">
                Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. 
                Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo.
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
                    <li>O não pagamento até a data prevista resultará no bloqueio automático da linha, sem aviso prévio.</li>
                    <li>O sistema reserva automaticamente o valor total da mensalidade a vencer. Caso o usuário tenha saldo disponível, esse valor será retido antes de permitir novos saques. Se o saldo for insuficiente, a fatura será atualizada com o valor restante com desconto proporcional e o usuário será notificado. O sistema também poderá aplicar automaticamente créditos disponíveis e gerar nova fatura atualizada.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">4. Comissões e conduta em rede</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>O usuário receberá comissões de forma recorrente sobre todos os cadastros realizados por meio do seu link de indicação.</li>
                    <li>É proibido divulgar os planos da empresa SmartVoz mencionando concorrentes ou operadoras reais, bem como fazer publicações ofensivas ou discriminatórias em mídias sociais. Tais práticas podem resultar em penalidades como advertência, perda da rede ou exclusão da conta.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">5. Suporte técnico</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Suporte técnico disponível 24 horas por dia, de segunda a segunda, por meio de ligação para a central 10315.</li>
                    <li>Selecione a opção 2, aguarde e selecione novamente a opção 2. Após isso, será solicitado que digite o código de acesso de 4 dígitos fornecido pela SmartVoz.</li>
                    <li>Na primeira tentativa, o código pode não ser reconhecido. Após a notificação, tente novamente o mesmo código.</li>
                    <li>Caso o atendimento solicite dados da empresa, informe que você é apenas um usuário com o código de acesso fornecido.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">6. Comunicação e notificações</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>O USUÁRIO será notificado no painel do escritório virtual (Dashboard) via sino com mensagens sobre:</li>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Vencimento da fatura</li>
                      <li>Status da ativação da linha</li>
                      <li>Instruções operacionais sobre ativação do SIM Card ou eSIM (leitura de QR Code)</li>
                      <li>Acompanhamento de consumo pelo app da operadora (via código SMS de 6 dígitos)</li>
                      <li>Possibilidade de upgrade de plano ou pergunta de plano</li>
                    </ul>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">7. Cadastro e validação</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>O cadastro é individual por CPF, com validação biométrica facial, escaneamento de documento (frente e verso) e confirmação por dois fatores.</li>
                    <li>Não é permitido o cadastro em nome de terceiros ou duplicações por CPF, e-mail ou número de contato.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">8. Disposições finais</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Este serviço é prestado exclusivamente pela SmartVoz, sem vínculo direto com operadoras de telefonia.</li>
                    <li>Este termo substitui quaisquer comunicações anteriores.</li>
                    <li>O foro para eventuais disputas será Porto Alegre/RS.</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        
        <div className="p-6 border-t bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="aceito-modal"
              checked={aceito}
              onCheckedChange={(checked) => setAceito(checked as boolean)}
            />
            <label htmlFor="aceito-modal" className="text-sm font-medium">
              Declaro que li e aceito todos os termos.
            </label>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              disabled={!aceito || enviando}
              onClick={handleAceite}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {enviando ? "Processando..." : "Aceitar e Prosseguir"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
