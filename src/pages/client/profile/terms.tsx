
import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function ClientTerms() {
  const { data: profile } = useProfile();

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meus Dados</h1>
          <p className="text-gray-600">Termos</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-gray-500" />
              <CardTitle>Termos</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Data de Aceite</h3>
                <p className="text-gray-500">Nenhum termo aceito</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Arquivo</h3>
                <Button variant="outline" size="sm">
                  Ver Documento
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Termos de Uso e Política de Privacidade</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-4">
                <p>
                  Bem-vindo aos nossos Termos de Uso. Ao utilizar nossos serviços, você concorda com os termos descritos neste documento.
                </p>
                <p>
                  <strong>1. Uso dos Serviços:</strong> Nossos serviços devem ser utilizados de acordo com as leis aplicáveis e estes termos.
                </p>
                <p>
                  <strong>2. Privacidade:</strong> Respeitamos sua privacidade e protegemos seus dados pessoais conforme nossa Política de Privacidade.
                </p>
                <p>
                  <strong>3. Responsabilidades:</strong> Você é responsável por manter a confidencialidade de suas credenciais de acesso.
                </p>
                <p>
                  <strong>4. Alterações:</strong> Podemos atualizar estes termos periodicamente. Notificaremos sobre mudanças significativas.
                </p>
              </div>

              <div className="mt-6">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  Aceitar Termos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
