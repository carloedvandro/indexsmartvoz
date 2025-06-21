
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-xl font-bold text-[#8425af]">
            Termos de Contrato
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. 
              Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base mb-2">1. Objeto do serviço</h3>
                <div className="space-y-2">
                  <p>Disponibilização de linha de telefonia móvel sob modelo pré-pago, gerenciado pela empresa SmartVoz.</p>
                  <p>O USUÁRIO não é o titular da linha, sendo apenas um usuário temporário com vigência mensal renovável.</p>
                  <p>O serviço é fornecido por ciclos de 30 (trinta) dias, condicionado ao pagamento antecipado do plano contratado.</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2">2. Uso da linha e limitações</h3>
                <div className="space-y-2">
                  <p>O uso é restrito a dados móveis e recursos básicos (como chamadas e SMS), conforme o plano adquirido.</p>
                  <p className="font-semibold">É expressamente proibido:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Vincular a linha a cadastros em WhatsApp, aplicativos bancários, redes sociais ou como número pessoal/profissional;</li>
                    <li>Realizar portabilidade, transferência de titularidade ou revenda não autorizada.</li>
                  </ul>
                  <p>O número da linha permanece sob controle exclusivo da SmartVoz, podendo ser reatribuído, desativado ou modificado a qualquer tempo, conforme necessidade técnica ou administrativa.</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2">3. Valor, pagamento e vigência</h3>
                <div className="space-y-2">
                  <p>O valor do plano será informado previamente ao pagamento, sendo válido por 30 dias corridos a partir da ativação.</p>
                  <p>O pagamento é antecipado e não reembolsável, mesmo em casos de uso parcial, desistência ou interrupção.</p>
                  <p>O não pagamento até a data prevista resultará no bloqueio automático da linha, sem aviso prévio.</p>
                  <p>A renovação do plano está condicionada a novo pagamento dentro do prazo.</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2">4. Responsabilidades e conduta</h3>
                <div className="space-y-2">
                  <p>O USUÁRIO compromete-se a utilizar a linha de forma ética, legal e conforme este termo.</p>
                  <p>Qualquer uso indevido, ilegal ou ofensivo à legislação vigente resultará no bloqueio imediato da linha, sem reembolso.</p>
                  <p className="font-semibold">A SmartVoz não se responsabiliza por:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Problemas técnicos relacionados à operadora real;</li>
                    <li>Bloqueios judiciais ou regulamentares;</li>
                    <li>Perda de acesso por mau uso, atrasos ou fraudes.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2">5. Suporte e comunicação</h3>
                <div className="space-y-2">
                  <p>O suporte ao cliente será prestado exclusivamente pelos canais oficiais da SmartVoz, informados no ato da contratação (como WhatsApp ou e-mail). Este termo poderá ser alterado a qualquer tempo, com publicação digital nos meios da empresa.</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2">6. Disposições finais</h3>
                <div className="space-y-2">
                  <p>Este serviço é prestado exclusivamente pela SmartVoz, sem vínculo direto com operadoras de telefonia junto ao usuário final.</p>
                  <p>Este termo substitui quaisquer comunicações ou acordos anteriores.</p>
                  <p>As partes concordam que qualquer dúvida ou problema legal relacionado a este contrato será resolvido na cidade de Porto Alegre, no estado do Rio Grande do Sul, que é o local escolhado para tratar questões judiciais.</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                <p className="text-green-800 font-semibold">
                  ✅ Ao prosseguir, o USUÁRIO declara estar de acordo com todos os termos acima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
