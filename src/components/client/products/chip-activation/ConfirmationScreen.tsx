
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
    <div className="min-h-screen text-white flex items-center justify-center p-4" style={{ backgroundColor: '#5c1f89' }}>
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

        <div className="px-4 py-2 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white break-words overflow-hidden">
          {/* Cabeçalho */}
          <div className="px-4 py-2 bg-transparent backdrop-blur-sm border-b border-white/30">
            <div className="flex text-sm font-medium justify-between">
              <span className="w-16">DDD</span>
              <span className="text-right">Código de barras do SIM card</span>
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className="px-4 py-2 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white break-words">
            {selectedLines.map((line, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="font-medium">{line.ddd}</span>
                </div>
                <div className="text-left -ml-4">
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
            className="px-4 py-2 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 text-white break-words min-w-[200px]"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
