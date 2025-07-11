
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationScreenProps {
  selectedLines: Array<{
    number: string;
    barcode?: string;
    ddd?: string;
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
    <div className="min-h-screen bg-purple-700 text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold text-white">Deu certo!</h2>
          <p className="text-xl text-white">
            Você solicitou a ativação do chip
          </p>
          <p className="text-lg text-white/90">
            O prazo do sistema para concluir ativação e o funcionamento da linha neste chip é de até 48 horas.
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-white font-medium border-b border-white/20 pb-2">
              <span>DDD</span>
              <span>Código de barras do SIM card</span>
            </div>
            {selectedLines.map((line, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" size={16} />
                  <span className="text-white font-medium">{line.ddd}</span>
                </div>
                <div className="text-right">
                  <p className="text-white/90 text-sm">ICCID</p>
                  <p className="font-mono text-sm text-white">{line.barcode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-sm mb-1">Protocolo</p>
          <p className="font-mono text-lg font-semibold text-white">{protocol}</p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleUnderstand}
            className="bg-purple-900 hover:bg-purple-800 text-white min-w-[200px] border border-white/20"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
