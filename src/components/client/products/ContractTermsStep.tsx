
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContractTermsStepProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

export function ContractTermsStep({
  acceptedTerms,
  onTermsChange
}: ContractTermsStepProps) {
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
        <div className="space-y-2 mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-black hover:underline">
                Termo de contratação digital – Serviço de linha pré-paga com renovação mensal – SmartVoz
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#8425af]">
                  Termo de contratação digital – Serviço de linha pré-paga com renovação mensal – SmartVoz
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Este documento estabelece as condições para o fornecimento de serviço de linha móvel pela empresa SmartVoz. 
                    Ao prosseguir com a contratação, o USUÁRIO declara que leu, entendeu e concorda plenamente com os termos abaixo.
                  </p>

                  <div className="space-y-3">
                    <h3 className="font-bold text-base">1. Objeto do serviço</h3>
                    <p>Disponibilização de linha de telefonia móvel sob modelo pré-pago, gerenciado pela empresa SmartVoz.</p>
                    <p>O USUÁRIO não é o titular da linha, sendo apenas um usuário temporário com vigência mensal renovável.</p>
                    <p>O serviço é fornecido por ciclos de 30 (trinta) dias, condicionado ao pagamento antecipado do plano contratado.</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-base">2. Uso da linha e limitações</h3>
                    <p>O uso é restrito a dados móveis e recursos básicos (como chamadas e SMS), conforme o plano adquirido.</p>
                    <p className="font-semibold">É expressamente proibido:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Vincular a linha a cadastros em WhatsApp, aplicativos bancários, redes sociais ou como número pessoal/profissional;</li>
                      <li>Realizar portabilidade, transferência de titularidade ou revenda não autorizada.</li>
                    </ul>
                    <p>O número da linha permanece sob controle exclusivo da SmartVoz, podendo ser reatribuído, desativado ou modificado a qualquer tempo, conforme necessidade técnica ou administrativa.</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-base">3. Valor, pagamento e vigência</h3>
                    <p>O valor do plano será informado previamente ao pagamento, sendo válido por 30 dias corridos a partir da ativação.</p>
                    <p>O pagamento é antecipado e não reembolsável, mesmo em casos de uso parcial, desistência ou interrupção.</p>
                    <p>O não pagamento até a data prevista resultará no bloqueio automático da linha, sem aviso prévio.</p>
                    <p>A renovação do plano está condicionada a novo pagamento dentro do prazo.</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-base">4. Responsabilidades e conduta</h3>
                    <p>O USUÁRIO compromete-se a utilizar a linha de forma ética, legal e conforme este termo.</p>
                    <p>Qualquer uso indevido, ilegal ou ofensivo à legislação vigente resultará no bloqueio imediato da linha, sem reembolso.</p>
                    <p className="font-semibold">A SmartVoz não se responsabiliza por:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Problemas técnicos relacionados à operadora real;</li>
                      <li>Bloqueios judiciais ou regulamentares;</li>
                      <li>Perda de acesso por mau uso, atrasos ou fraudes.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-base">5. Suporte e comunicação</h3>
                    <p>O suporte ao cliente será prestado exclusivamente pelos canais oficiais da SmartVoz, informados no ato da contratação (como WhatsApp ou e-mail). Este termo poderá ser alterado a qualquer tempo, com publicação digital nos meios da empresa.</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-base">6. Disposições finais</h3>
                    <p>Este serviço é prestado exclusivamente pela SmartVoz, sem vínculo direto com operadoras de telefonia junto ao usuário final.</p>
                    <p>Este termo substitui quaisquer comunicações ou acordos anteriores.</p>
                    <p>As partes concordam que qualquer dúvida ou problema legal relacionado a este contrato será resolvido na cidade de Porto Alegre, no estado do Rio Grande do Sul, que é o local escolhido para tratar questões judiciais.</p>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✅ Ao prosseguir, o USUÁRIO declara estar de acordo com todos os termos acima.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-start space-x-2 text-left ml-[12px]">
          <Checkbox 
            id="terms" 
            checked={acceptedTerms} 
            onCheckedChange={checked => onTermsChange(checked as boolean)} 
            className="mt-0.5" 
          />
          <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer w-[calc(100%+7px)] pl-1 mt-[1.25px]">
            Aceito receber comunicações e ofertas da Smartvoz.
          </label>
        </div>
      </div>
    </div>
  );
}
