
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
    <div className="min-h-screen bg-[#5f0889] text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Deu certo!</h2>
          <p className="text-2xl">
            {showBarcodes 
              ? "Você solicitou a ativação do chip"
              : "Você solicitou a contratação dos planos"
            }
          </p>
          <p className="text-lg">
            {showBarcodes 
              ? "O prazo do sistema para concluir ativação e o funcionamento da linha neste chip é de até 48 horas."
              : "Em breve nossa equipe entrará em contato para finalizar sua contratação"
            }
          </p>
        </div>

        <div className="border border-white/30 rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4">
                  {showBarcodes ? "DDD" : "Plano"}
                </th>
                <th className="py-3 px-4">
                  {showBarcodes ? "Código de barras do SIM card" : "Valor"}
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.map((line) => (
                <tr key={line.id} className="border-t border-white/20">
                  <td className="py-3 px-4">
                    {showBarcodes ? (
                      <div className="flex items-center gap-2">
                        <Check className="text-green-400" size={16} />
                        <span>{line.ddd || 'Não informado'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check className="text-green-400" size={16} />
                        {`${line.internet} - ${line.type}`}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {showBarcodes ? (
                      <div className="flex items-center gap-2">
                        ICCID
                        <span>{line.barcode}</span>
                      </div>
                    ) : (
                      `R$ ${line.price.toFixed(2)}/mês`
                    )}
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
            className="border border-white/30 hover:bg-white/10 text-white min-w-[200px] rounded-lg"
            variant="ghost"
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
