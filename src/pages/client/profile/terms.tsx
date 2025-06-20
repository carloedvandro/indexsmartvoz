
import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientTerms() {
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Termos de Uso</h1>
            <p className="text-gray-600">Política de Privacidade</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            ← Voltar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-gray-500" />
              <CardTitle>Termos de Uso e Política de Privacidade – SMARTVOZ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none text-sm text-gray-700 space-y-6">
              <p>
                Ao se cadastrar e/ou utilizar os serviços da SMARTVOZ, o CLIENTE ou USUÁRIO concorda, de forma expressa e sem reservas, com todas as condições estabelecidas neste Termo de Uso e na Política de Privacidade.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">1. DAS DEFINIÇÕES</h3>
                <p className="mb-3">Para os efeitos exclusivos deste Termo de Uso, aplicam-se as seguintes definições:</p>
                <p className="mb-2"><strong>CLIENTE SMARTVOZ:</strong> Pessoa física que contrata qualquer um dos produtos ou serviços oferecidos pela SMARTVOZ.</p>
                <p><strong>PRODUTOS:</strong> Serviços disponibilizados pela SMARTVOZ que oferecem canais de autoatendimento, como planos de telefonia móvel (pré-pago), internet e outros serviços digitais.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">2. DAS CONDIÇÕES GERAIS DO SERVIÇO</h3>
                <div className="space-y-2">
                  <p><strong>2.1.</strong> A SMARTVOZ se reserva o direito de alterar, a qualquer momento e sem aviso prévio, estes Termos de Uso, bem como a apresentação, configuração e condições de uso da plataforma Smartvoz.</p>
                  <p><strong>2.2.</strong> O objetivo da Smartvoz é aprimorar o relacionamento da SMARTVOZ com seus clientes, oferecendo canais de autoatendimento, tais como:</p>
                  <ul className="list-disc ml-6 mb-2">
                    <li>Internet: www.smartvoz.com.br;</li>
                    <li>Celular: via Central de Atendimento.</li>
                  </ul>
                  <p><strong>2.3.</strong> Qualquer problema relacionado ao uso da plataforma Smartvoz deverá ser comunicado à Central de Relacionamento da SMARTVOZ.</p>
                  <p><strong>2.4.</strong> O acesso à plataforma Smartvoz via internet é compatível com os navegadores mais atuais (Chrome, Firefox, Safari e Edge). Não garantimos o funcionamento adequado em versões desatualizadas.</p>
                  <p><strong>2.5.</strong> A SMARTVOZ não se responsabiliza por eventuais indisponibilidades dos serviços causadas por força maior, caso fortuito ou manutenções técnicas.</p>
                  <p><strong>2.6.</strong> Para criar uma senha de autoatendimento, o usuário deve ser CLIENTE ou USUÁRIO SMARTVOZ.</p>
                  <p><strong>2.7.</strong> O login é realizado utilizando CPF, e-mail ou número de telefone, com validação via código de confirmação enviado por SMS ou e-mail.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">3. DO CADASTRO</h3>
                <p className="mb-2">O cadastro pode ser feito através de:</p>
                <p className="mb-3"><strong>Site:</strong> www.smartvoz.com.br.</p>
                <p className="mb-2"><strong>Procedimento de cadastro:</strong></p>
                <ul className="list-disc ml-6">
                  <li>Informar CPF;</li>
                  <li>Informar um e-mail válido;</li>
                  <li>Informar o número de telefone SMARTVOZ;</li>
                  <li>Confirmar o cadastro por meio de código enviado via SMS ou e-mail.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">4. FUNCIONALIDADES DISPONÍVEIS</h3>
                <p className="mb-2">O CLIENTE SMARTVOZ terá acesso aos seguintes serviços por meio da plataforma Smartvoz:</p>
                <ul className="list-disc ml-6 mb-3">
                  <li>Suporte via Central de Atendimento;</li>
                  <li>Consulta de consumo de dados;</li>
                  <li>Ativação ou cancelamento de serviços;</li>
                  <li>Realização de pagamentos.</li>
                </ul>
                <p><strong>Observação:</strong> O uso de dados móveis durante o acesso aos serviços poderá consumir o pacote de internet contratado, conforme as condições do plano.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">5. SEGURANÇA</h3>
                <div className="space-y-2">
                  <p><strong>5.1.</strong> O usuário é o único responsável pela guarda e sigilo de suas credenciais de acesso.</p>
                  <p><strong>5.2.</strong> Em caso de perda, roubo ou suspeita de uso indevido de dados de acesso, o usuário deve comunicar imediatamente a SMARTVOZ.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">6. RESPONSABILIDADE</h3>
                <div className="space-y-2">
                  <p><strong>6.1.</strong> A SMARTVOZ não se responsabiliza por:</p>
                  <ul className="list-disc ml-6">
                    <li>Danos decorrentes de uso indevido;</li>
                    <li>Perda de senha;</li>
                    <li>Ataques virtuais;</li>
                    <li>Instabilidades de conexão à internet;</li>
                    <li>Problemas técnicos no aparelho utilizado pelo cliente.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">7. DAS OBRIGAÇÕES DO CLIENTE E USUÁRIO SMARTVOZ</h3>
                <div className="space-y-2">
                  <p><strong>7.1.</strong> O CLIENTE e o USUÁRIO SMARTVOZ devem:</p>
                  <ul className="list-disc ml-6">
                    <li>Cumprir integralmente estes Termos de Uso;</li>
                    <li>Manter em segurança suas informações de acesso (login e senha);</li>
                    <li>Não realizar atividades ilícitas, fraudulentas ou que prejudiquem terceiros.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">POLÍTICA DE PRIVACIDADE</h3>
                <p className="mb-3">A SMARTVOZ preza pela privacidade e segurança das informações de seus clientes, adotando os melhores processos e tecnologias disponíveis.</p>
                
                <div className="mb-4">
                  <p className="font-semibold mb-2">Tipos de dados coletados:</p>
                  <ul className="list-disc ml-6">
                    <li>Dados de cadastro;</li>
                    <li>Dados de consumo;</li>
                    <li>Cookies;</li>
                    <li>Dados de localização.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Tratamento de dados:</p>
                  <p>Os dados são tratados internamente pela SMARTVOZ e, quando necessário, podem ser compartilhados com parceiros, sempre sob rígidos controles de segurança.</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Transparência:</p>
                  <p>Para detalhes completos, consulte: www.smartvoz.com.br/politica-de-privacidade.</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Segurança:</p>
                  <ul className="list-disc ml-6">
                    <li>As senhas são pessoais e intransferíveis;</li>
                    <li>A SMARTVOZ nunca solicita senha por telefone, e-mail ou SMS;</li>
                    <li>O usuário deve manter seus dispositivos protegidos com antivírus atualizado.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">MUDANÇAS NA POLÍTICA DE PRIVACIDADE</h3>
                <p>A SMARTVOZ pode alterar esta Política de Privacidade a qualquer momento. Recomendamos consulta periódica ao site: www.smartvoz.com.br.</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button 
                onClick={handleBack}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Li e Aceito os Termos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
