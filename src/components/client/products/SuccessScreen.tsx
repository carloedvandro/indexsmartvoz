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
      <div className="max-w-lg w-full space-y-12">
        <div className="space-y-6 text-center">
          <h2 className="text-4xl font-bold">Deu certo!</h2>
          <p className="text-3xl">
            Você solicitou a troca de chips
          </p>
          <p className="text-xl text-center px-4">
            Você já pode colocar o novo chip no aparelho pra fazer ligações e usar a internet
          </p>
        </div>

        <div className="bg-white/10 rounded-lg mx-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left w-1/3">Linha</th>
                <th className="py-3 px-6 text-left">Código de barras do SIM card</th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.map((line) => (
                <tr key={line.id}>
                  <td className="py-3 px-6 flex items-center gap-2">
                    <Check className="text-green-400" size={20} />
                    {line.ddd}
                  </td>
                  <td className="py-3 px-6 font-mono">
                    {line.barcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <p className="mb-8 text-sm">Protocolo {protocol}</p>

          <Button
            onClick={onUnderstand}
            className="bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-lg px-12 py-4 text-lg min-w-[200px]"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}