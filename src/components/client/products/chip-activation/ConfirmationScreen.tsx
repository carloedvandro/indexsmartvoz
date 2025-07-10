
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationScreenProps {
  selectedLines: Array<{
    number: string;
    barcode?: string;
  }>;
  protocol: string;
}

export function ConfirmationScreen({ selectedLines, protocol }: ConfirmationScreenProps) {
  const navigate = useNavigate();

  const handleUnderstand = () => {
    // Limpar dados do localStorage
    localStorage.removeItem('orderData');
    localStorage.removeItem('selectedPlan');
    
    // Navegar para o dashboard
    navigate("/client/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold">Ativação Enviada!</h2>
          <p className="text-xl">
            Sua solicitação de ativação foi enviada para aprovação
          </p>
          <p className="text-lg text-gray-600">
            Nossa equipe analisará e processará sua ativação em até 48 horas úteis.
            Você receberá uma notificação assim que for aprovada.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border">
          <h3 className="font-semibold mb-3 text-center">Resumo da Ativação</h3>
          <div className="space-y-3">
            {selectedLines.map((line, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <Check className="text-green-500" size={16} />
                    {line.number}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">ICCID:</p>
                  <p className="font-mono text-xs text-gray-800">{line.barcode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Protocolo de Ativação</p>
          <p className="font-mono text-lg font-semibold text-blue-800">{protocol}</p>
        </div>

        <div className="space-y-3 text-center text-sm text-gray-700">
          <p>
            <strong>Próximos passos:</strong>
          </p>
          <ul className="space-y-1 text-left text-gray-600">
            <li>• Nossa equipe analisará sua solicitação</li>
            <li>• Você receberá uma confirmação por e-mail</li>
            <li>• A ativação será processada em até 48h úteis</li>
            <li>• Após aprovação, sua linha estará ativa</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleUnderstand}
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white min-w-[200px]"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
