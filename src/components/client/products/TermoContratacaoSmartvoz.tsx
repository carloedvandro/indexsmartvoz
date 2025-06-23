
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TermoContratacaoSmartvozProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

const TermoContratacaoSmartvoz = ({
  acceptedTerms,
  onTermsChange
}: TermoContratacaoSmartvozProps) => {
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;
    console.log('📝 TermoContratacaoSmartvoz - Checkbox alterado:', isChecked);
    onTermsChange(isChecked);
  };

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
        description: "Aceite registrado com sucesso. Você receberá a confirmação via e-mail, WhatsApp e dashboard.",
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
    <div className="bg-white text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-xl font-bold mb-4 text-left text-[#8425af]">
          Termo de contratação digital – serviço de linha pré-paga com renovação mensal
        </h1>

        <p className="mb-4 text-sm">
          Este documento estabelece as condições para fornecimento de serviço de linha móvel pela empresa SmartVoz. Ao prosseguir, o usuário declara que leu e aceita os termos, conforme as legislações aplicáveis:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
          <li>Código de Defesa do Consumidor – Lei nº 8.078/1990</li>
          <li>Marco Civil da Internet – Lei nº 12.965/2014</li>
          <li>Código Civil – arts. 186 e 927</li>
          <li>Lei de Marketing Multinível – Lei nº 6.019/1974</li>
        </ul>

        <div className="space-y-4">
          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">1. Objetivo do serviço</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Disponibilização de linha móvel pré-paga gerenciada pela SmartVoz.</li>
              <li>O usuário é apenas um utilizador temporário, com vigência mensal renovável.</li>
              <li>Uso limitado ao plano contratado, válido por 30 dias, condicionado a pagamento antecipado.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">2. Uso e limitações</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Proibido: portabilidade, revenda não autorizada, uso como número pessoal/profissional em apps como WhatsApp ou bancos.</li>
              <li>O número poderá ser desativado ou modificado a qualquer tempo.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">3. Pagamento e vigência</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>O valor será informado antes do pagamento, que é antecipado e não reembolsável.</li>
              <li>Pagamento obrigatório antes do escaneamento e ativação.</li>
              <li>O sistema reserva o valor da mensalidade apenas 10 dias antes do vencimento. Antes disso, o saque é livre.</li>
              <li>Créditos disponíveis poderão ser usados para abater o valor da fatura automaticamente.</li>
              <li>Taxa de 3% será aplicada em cada solicitação de saque.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">4. Comissões e conduta</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Usuário recebe comissões pelos cadastros via link de indicação pessoal.</li>
              <li>É proibido comparar ou difamar operadoras como Vivo, Claro, TIM ou demais concorrentes.</li>
              <li>Divulgação de campanhas ou logos sem autorização é vedada.</li>
              <li>Sanções: bloqueio de conta, suspensão de comissões, exclusão e responsabilização judicial.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">5. Suporte técnico</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Disponível 24h via ligação para 10315:</li>
              <li className="ml-6">Passos: opção 2 → opção 2 novamente → código de 4 dígitos</li>
              <li className="ml-6">Se não reconhecido: tente novamente após notificação</li>
              <li className="ml-6">Atendimento: usuário informa que possui código fornecido e solicita suporte técnico</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">6. Comunicação e notificações</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Confirmação via WhatsApp, e-mail e dashboard:</li>
              <li className="ml-6">Aceite do termo com IP, data/hora</li>
              <li className="ml-6">Status da linha, fatura, ativação e upgrade</li>
              <li className="ml-6">Acesso ao app oficial da operadora para acompanhamento do plano</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">7. Cadastro e validação</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Cadastro via CPF único, com validação facial, documento e selfie.</li>
              <li>Proibido duplicar cadastros por e-mail, WhatsApp ou CPF.</li>
              <li>Feito no site: www.smartvoz.com.br</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">8. Segurança</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Senhas são pessoais. Não compartilhe.</li>
              <li>Comunique perdas ou acessos indevidos.</li>
              <li>A SmartVoz nunca solicita senhas por canais externos.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">9. Política de privacidade</h2>
            <p className="text-sm">
              A SmartVoz poderá alterar esta política a qualquer momento. Consulte regularmente o site oficial.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3 text-gray-900">10. Disposições finais</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Serviço prestado unicamente pela SmartVoz, sem vínculo com operadoras.</li>
              <li>Termo substitui qualquer versão anterior.</li>
              <li>Foro: Comarca de Porto Alegre – RS.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="aceito-termo"
              checked={acceptedTerms}
              onCheckedChange={handleCheckboxChange}
            />
            <label htmlFor="aceito-termo" className="text-sm font-medium cursor-pointer">
              Declaro que li e aceito todos os termos.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvoz;
