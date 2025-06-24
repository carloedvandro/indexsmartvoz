
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TermoContratacaoSmartvozProps {
  acceptedTerms: boolean;
  onTermsChange: (accepted: boolean) => void;
}

const TermoContratacaoSmartvoz = ({ acceptedTerms, onTermsChange }: TermoContratacaoSmartvozProps) => {
  const [aceito, setAceito] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const { toast } = useToast();

  const handleAceite = async () => {
    try {
      setEnviando(true);
      
      // Verificar se o usuário está logado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuário não está logado');
      }

      // Registrar aceite via Edge Function
      const { data, error } = await supabase.functions.invoke('registro-termo', {
        body: {
          aceite: true,
          receberComunicados: true,
          timestamp: new Date().toISOString(),
          ip: "auto",
          geo: true
        }
      });

      if (error) {
        throw error;
      }

      setMensagem(
        "Aceite registrado com sucesso. Você receberá a confirmação via e-mail, WhatsApp e no seu painel de notificações com IP, data, hora e localização."
      );
      
      toast({
        title: "Sucesso",
        description: "Aceite registrado com sucesso!",
      });
      
      onTermsChange(true);
    } catch (error) {
      console.error('Erro ao registrar aceite:', error);
      const erroDetalhado = error?.message || "Erro desconhecido.";
      setMensagem(`Erro ao registrar o aceite: ${erroDetalhado}`);
      
      toast({
        title: "Erro",
        description: "Erro ao registrar o aceite. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  const Secao = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <h2 className="text-md font-bold text-left text-purple-700 mb-1">{titulo}</h2>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <div className="bg-white p-6 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-lg font-semibold text-left">
            Termo de contratação digital – serviço de linha pré-paga com renovação mensal
          </h1>
        </div>

        <p className="text-sm mb-4">
          Este documento estabelece as condições para fornecimento de serviço de linha móvel pela empresa SmartVoz. Ao prosseguir, o usuário declara que leu e aceita os termos, conforme as legislações aplicáveis:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
          <li>Código de Defesa do Consumidor – Lei nº 8.078/1990</li>
          <li>Marco Civil da Internet – Lei nº 12.965/2014</li>
          <li>Código Civil – arts. 186 e 927</li>
          <li>Lei de Marketing Multinível – Lei nº 6.019/1974</li>
        </ul>

        <Secao titulo="1. Objetivo do serviço">
          <ul className="list-disc list-inside space-y-1">
            <li>Disponibilização de linha móvel pré-paga gerenciada pela SmartVoz.</li>
            <li>O usuário é apenas um utilizador temporário, com vigência mensal renovável.</li>
            <li>Uso limitado ao plano contratado, válido por 30 dias, condicionado a pagamento antecipado.</li>
          </ul>
        </Secao>

        <Secao titulo="2. Uso e limitações">
          <ul className="list-disc list-inside space-y-1">
            <li>Proibido: portabilidade, revenda não autorizada, uso como número pessoal/profissional em apps como WhatsApp ou bancos.</li>
            <li>O número poderá ser desativado ou modificado a qualquer tempo.</li>
          </ul>
        </Secao>

        <Secao titulo="3. Pagamento e vigência">
          <ul className="list-disc list-inside space-y-1">
            <li>O valor será informado antes do pagamento, que é antecipado e não reembolsável.</li>
            <li>Pagamento obrigatório antes do escaneamento e ativação.</li>
            <li>O sistema reserva o valor da mensalidade apenas 10 dias antes do vencimento. Antes disso, o saque é livre.</li>
            <li>Créditos disponíveis poderão ser usados para abater o valor da fatura automaticamente.</li>
            <li>Taxa de 3% será aplicada em cada solicitação de saque.</li>
          </ul>
        </Secao>

        <Secao titulo="4. Comissões e conduta">
          <ul className="list-disc list-inside space-y-1">
            <li>Usuário recebe comissões pelos cadastros via link de indicação pessoal.</li>
            <li>É proibido comparar ou difamar operadoras como Vivo, Claro, TIM ou demais concorrentes.</li>
            <li>Divulgação de campanhas ou logos sem autorização é vedada.</li>
            <li>Sanções: bloqueio de conta, suspensão de comissões, exclusão e responsabilização judicial.</li>
          </ul>
        </Secao>

        <Secao titulo="5. Suporte técnico">
          <ul className="list-disc list-inside space-y-1">
            <li>Disponível 24h via ligação para 10315:</li>
            <li className="ml-6">Passos: opção 2 → opção 2 novamente → código de 4 dígitos</li>
            <li className="ml-6">Se não reconhecido: tente novamente após notificação</li>
            <li className="ml-6">Atendimento: usuário informa que possui código fornecido e solicita suporte técnico</li>
          </ul>
        </Secao>

        <Secao titulo="6. Comunicação e notificações">
          <ul className="list-disc list-inside space-y-1">
            <li>Confirmação via WhatsApp, e-mail e dashboard:</li>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Aceite do termo com IP, data/hora</li>
              <li>Status da linha, fatura, ativação e upgrade</li>
              <li>Acesso ao app oficial da operadora para acompanhamento do plano</li>
            </ul>
          </ul>
        </Secao>

        <Secao titulo="7. Cadastro e validação">
          <ul className="list-disc list-inside space-y-1">
            <li>Cadastro via CPF único, com validação facial, documento e selfie.</li>
            <li>Proibido duplicar cadastros por e-mail, WhatsApp ou CPF.</li>
            <li>Feito no site: www.smartvoz.com.br</li>
          </ul>
        </Secao>

        <Secao titulo="8. Segurança">
          <ul className="list-disc list-inside space-y-1">
            <li>Senhas são pessoais. Não compartilhe.</li>
            <li>Comunique perdas ou acessos indevidos.</li>
            <li>A SmartVoz nunca solicita senhas por canais externos.</li>
          </ul>
        </Secao>

        <Secao titulo="9. Política de privacidade">
          <p className="text-sm">
            A SmartVoz poderá alterar esta política a qualquer momento. Consulte regularmente o site oficial.
          </p>
        </Secao>

        <Secao titulo="10. Disposições finais">
          <ul className="list-disc list-inside space-y-1">
            <li>Serviço prestado unicamente pela SmartVoz, sem vínculo com operadoras.</li>
            <li>Termo substitui qualquer versão anterior.</li>
            <li>Foro: Comarca de Porto Alegre – RS.</li>
          </ul>
        </Secao>

        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Ao contratar e ativar o serviço, o USUÁRIO confirma o aceite integral deste Termo de Contratação Digital.
          </p>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={aceito}
              onChange={(e) => setAceito(e.target.checked)}
            />
            <label className="text-sm">Li e aceito os termos acima.</label>
          </div>
          <button
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAceite}
            disabled={!aceito || enviando}
          >
            {enviando ? "Enviando..." : "Confirmar e Prosseguir"}
          </button>
          {mensagem && <p className="mt-2 text-sm text-green-600">{mensagem}</p>}
        </div>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvoz;
