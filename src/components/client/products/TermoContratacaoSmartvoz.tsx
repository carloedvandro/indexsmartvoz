
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

  const handleCheckboxChange = (checked: boolean) => {
    console.log('📝 Checkbox alterado:', checked);
    onTermsChange(checked);
  };

  const handleAceite = async () => {
    if (!acceptedTerms) return;
    
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

  const Secao = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <h2 className="text-md font-bold text-left text-purple-700 mb-1">{titulo}</h2>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <div className="bg-white text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-6">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-lg font-semibold text-left text-[#8425af]">
            Termo de contratação digital – serviço de linha pré-paga com renovação mensal
          </h1>
        </div>

        <Secao titulo="1. Objetivo do serviço">
          Disponibilização de linha de telefonia móvel no modelo pré-pago, com vigência mensal e renovação mediante pagamento.
        </Secao>

        <Secao titulo="2. Uso da linha e limitações">
          O uso é restrito a dados móveis e recursos básicos (chamadas e SMS), conforme o plano contratado. É proibido:
          <ul className="list-disc ml-6 mt-2">
            <li>Vincular a linha a serviços bancários, WhatsApp, redes sociais ou como número pessoal/profissional;</li>
            <li>Realizar portabilidade, revenda ou transferência de titularidade não autorizada.</li>
          </ul>
        </Secao>

        <Secao titulo="3. Cadastro">
          O cadastro será feito por CPF individual com validação facial e biometria. É necessário escaneamento de documento frente e verso, validação de número de telefone e e-mail único por CPF. Acessos são verificados com múltiplos fatores e dados não podem ser duplicados.
        </Secao>

        <Secao titulo="4. Pagamento e Vigência">
          O valor do plano será informado previamente. O pagamento é antecipado e não reembolsável. O sistema poderá reservar automaticamente o valor da fatura até 10 dias antes do vencimento. Se o saldo for insuficiente, será gerada nova fatura com valor proporcional ajustado. O sistema poderá aplicar créditos disponíveis para gerar fatura com desconto. Taxa de 3% poderá ser aplicada sobre cada saque.
        </Secao>

        <Secao titulo="5. Segurança">
          O usuário é responsável pela guarda de suas credenciais. Em caso de perda ou uso indevido, comunique a SmartVoz. Nunca forneça senhas por telefone ou e-mail. Use antivírus atualizado.
        </Secao>

        <Secao titulo="6. Suporte Técnico e Comunicação">
          O suporte técnico está disponível 24h/dia, de segunda a segunda, via ligação para 10315 &gt; opção 2 &gt; opção 2 novamente &gt; código de 4 dígitos. Caso não reconhecido na primeira tentativa, repita na segunda. Atendimento básico será prestado com base no código individual fornecido.
          <br /><br />
          Comunicações são feitas por notificações no dashboard, e-mail e WhatsApp após aceite.
        </Secao>

        <Secao titulo="7. Comissões e Conduta">
          O usuário pode divulgar o serviço via link pessoal e receber comissões recorrentes. É proibido comparar planos ou desinformar sobre operadoras como Vivo, Claro, TIM e demais operadoras do mercado. Violações poderão resultar em advertência, suspensão da conta, exclusão da rede e responsabilização judicial conforme Código de Defesa do Consumidor e regras do marketing multinível.
        </Secao>

        <Secao titulo="8. Aplicativo de acompanhamento">
          Disponível app da operadora para acompanhamento em tempo real da franquia. O usuário acessa com código SMS de 6 dígitos vinculado à linha contratada. Permite acompanhar uso de dados, porcentagem e solicitar upgrade de plano a qualquer momento com cobrança na próxima fatura.
        </Secao>

        <Secao titulo="9. Política de Privacidade">
          A SmartVoz pode alterar esta política a qualquer momento. Consulte regularmente www.smartvoz.com.br para atualizações.
        </Secao>

        <div className="mt-6 space-y-4">
          <label className="inline-flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-0.5 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Declaro que li e aceito todos os termos.
            </span>
          </label>
          
          <button
            disabled={!acceptedTerms || enviando}
            onClick={handleAceite}
            className="w-full bg-purple-600 text-white font-semibold px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            {enviando ? "Processando..." : "Aceitar e Prosseguir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvoz;
