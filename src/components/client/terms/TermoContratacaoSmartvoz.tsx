
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

      toast({
        title: "Sucesso",
        description: "Aceite registrado com sucesso. Você receberá a confirmação via e-mail, WhatsApp e no seu painel de notificações com IP, data, hora e localização.",
      });
    } catch (error) {
      console.error('Erro ao registrar aceite:', error);
      const erroDetalhado = error?.message || "Erro desconhecido.";
      
      toast({
        title: "Erro",
        description: `Erro ao registrar o aceite: ${erroDetalhado}`,
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

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Ao contratar e ativar o serviço, o USUÁRIO confirma o aceite integral deste Termo de Contratação Digital.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="aceito"
                  checked={aceito}
                  onCheckedChange={(checked) => setAceito(checked as boolean)}
                />
                <label htmlFor="aceito" className="text-sm font-medium">
                  Li e aceito os termos acima.
                </label>
              </div>
              
              <Button
                disabled={!aceito || enviando}
                onClick={handleAceite}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {enviando ? "Enviando..." : "Confirmar e Prosseguir"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermoContratacaoSmartvoz;
