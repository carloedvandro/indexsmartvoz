
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ESIMActivation } from "@/services/esim/esimActivationService";
import { useNavigate } from "react-router-dom";

type SuccessScreenProps = {
  data: Partial<ESIMActivation>;
};

export function SuccessScreen({ data }: SuccessScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#8425af] text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Deu certo!</h2>
          <p className="text-2xl">Você solicitou a ativação do chip</p>
          <p className="text-lg">
            O prazo do sistema para concluir ativação e o funcionamento da linha neste chip é de até 48 horas.
          </p>
        </div>

        <div className="border border-white/30 rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4">DDD</th>
                <th className="py-3 px-4">Código de barras do SIM card</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/20">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Check className="text-green-400" size={16} />
                    <span>{data.phone_number?.substring(0, 2) || '15'}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    ICCID
                    <span>{data.iccid || data.eid || '07418877'}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm">
          Protocolo {data.protocol_id || data.id || '849bf203-1881-43bf-8bfc-b67ccd23228f'}
        </p>

        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/client/dashboard")}
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
