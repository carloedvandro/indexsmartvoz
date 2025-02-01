import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
};

interface SuccessScreenProps {
  selectedLines: Line[];
  protocol: string;
  onUnderstand: () => void;
  showBarcodes?: boolean;
}

export function SuccessScreen({ selectedLines, protocol, onUnderstand, showBarcodes }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-[#8425af] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold mb-4">Deu certo!</h2>
          <p className="text-2xl mb-4">
            Você solicitou a ativação do chip
          </p>
          <p className="text-xl leading-relaxed mb-8">
            O prazo do sistema para concluir ativação e o funcionamento da linha neste chip é de até 48 horas.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mx-4 mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4 text-lg font-normal">ICCID</th>
                <th className="py-3 px-4 text-lg font-normal">Código de barras do SIM card</th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.map((line) => (
                <tr key={line.id}>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    {line.ddd}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    {line.barcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-lg mb-8">Protocolo {protocol}</p>

        <Button
          onClick={onUnderstand}
          className="w-full max-w-md mx-auto h-14 text-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl transition-colors"
        >
          Entendi
        </Button>
      </div>
    </div>
  );
}