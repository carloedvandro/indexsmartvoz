
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
    <div className="min-h-screen text-white flex items-center justify-center p-4" style={{ backgroundColor: '#6A1B9A' }}>
      <div className="max-w-lg w-full space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold text-white">Deu certo!</h2>
          <p className="text-xl text-white">
            Você solicitou a ativação do chip
          </p>
          <p className="text-lg text-white/90">
            O prazo do sistema para concluir ativação e o funcionamento da linha neste chip é de até 24 horas.
          </p>
        </div>

        <div className="rounded-lg border border-white/20 overflow-hidden bg-transparent">
          {/* Cabeçalho */}
          <div className="bg-transparent px-4 py-3 border-b border-white/20">
            <div className="flex text-sm font-medium">
              <span className="w-16">DDD</span>
              <span>Código de barras do SIM card</span>
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className="px-4 py-4 bg-transparent">
            {selectedLines.map((line, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="font-medium">{line.ddd}</span>
                </div>
                <div className="text-left ml-4">
                  <div className="text-sm">ICCID {line.barcode}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-sm">Protocolo {protocol.replace('CHIP-', '')}</p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleUnderstand}
            className="bg-transparent hover:bg-white/10 text-white min-w-[200px] border border-white/20"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
