import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
  phoneNumber?: string;
};

interface ActivationConfirmationProps {
  selectedLines: Line[];
  onFinish: () => void;
}

export function ActivationConfirmation({
  selectedLines,
  onFinish
}: ActivationConfirmationProps) {
  // Gera protocolo dinâmico baseado na data atual
  const generateProtocol = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const sequencial = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${ano}${mes}${dia}${sequencial}`;
  };

  const protocolo = generateProtocol();

  return (
    <div className="space-y-6 -mt-20 pt-10">
      <div 
        className="px-10 py-10 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg text-center"
        style={{
          backgroundColor: '#6b1c9c',
          boxShadow: 'inset 0 2px 1px rgba(255,255,255,0.2)'
        }}
      >
        {/* Tabela com linha e ICCID */}
        <div className="w-full mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-left text-white font-bold">Linha</th>
                <th className="py-3 px-4 text-left text-white font-bold">Código de barras do SIM card</th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.map((line, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-white">
                        ({line.ddd}) {line.phoneNumber || '99957-6444'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">
                    {line.barcode || '8955 1095 1710 2002 7968'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Protocolo */}
        <div className="mb-8">
          <span className="text-white text-base">
            Protocolo <strong>{protocolo}</strong>
          </span>
        </div>

        {/* Botão Entendi */}
        <Button
          onClick={onFinish}
          className="px-7 py-3 rounded-lg border border-white bg-transparent text-white font-bold hover:bg-white hover:text-purple-800 transition-all duration-300"
        >
          Entendi
        </Button>
      </div>
    </div>
  );
}