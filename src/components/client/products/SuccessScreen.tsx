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
    <div className="min-h-screen bg-[#660099] text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Deu certo!</h2>
          <p className="text-2xl">
            Você solicitou a ativação do chip
          </p>
          <p className="text-lg text-center">
            O prazo do sistema para concluir ativação e o funcionamento da linha neste chip é de até 48 horas.
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left w-1/4">ICCID</th>
                <th className="py-2 px-4 text-left">Código de barras do SIM card</th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.map((line) => (
                <tr key={line.id}>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <Check className="text-green-400" size={16} />
                    {line.ddd}
                  </td>
                  <td className="py-2 px-4 font-mono">
                    {line.barcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm">Protocolo {protocol}</p>

        <div className="flex justify-center">
          <Button
            onClick={onUnderstand}
            className="bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-lg px-8 py-3 min-w-[200px]"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}