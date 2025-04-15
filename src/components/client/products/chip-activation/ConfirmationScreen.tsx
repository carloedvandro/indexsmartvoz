
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
    navigate("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#8425af] text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Deu certo!</h2>
          <p className="text-2xl">Você solicitou a troca de chips</p>
          <p className="text-lg">
            Você já pode colocar o novo chip no aparelho pra fazer e usar a internet
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Linha</th>
                <th className="py-2">Código de barras do SIM card</th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.map((line, index) => (
                <tr key={index} className="border-t border-white/20">
                  <td className="py-2 flex items-center gap-2">
                    <Check className="text-green-400" size={16} />
                    {line.number}
                  </td>
                  <td className="py-2">{line.barcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm">Protocolo {protocol}</p>

        <div className="flex justify-center">
          <Button
            onClick={handleUnderstand}
            className="bg-white/20 hover:bg-white/30 text-white min-w-[200px]"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
