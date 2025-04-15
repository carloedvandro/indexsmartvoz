
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
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-[#9b87f5]/10 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-[#9b87f5]" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Solicitação Enviada!</h2>
      
      <p className="text-gray-600">
        Você receberá em breve um e-mail com as instruções para ativação do seu eSIM.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg max-w-sm mx-auto">
        <div className="space-y-2 text-left">
          <p><strong>Tipo:</strong> {data.activation_type === 'self' ? 'Para Mim' : 'Para Colaborador'}</p>
          <p><strong>Dispositivo:</strong> {data.device_type === 'ios' ? 'iOS (iPhone)' : 'Android'}</p>
          <p><strong>IMEI:</strong> {data.imei}</p>
          <p><strong>EID:</strong> {data.eid}</p>
        </div>
      </div>

      <Button 
        onClick={() => navigate("/client/dashboard")}
        className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
      >
        Voltar para o Dashboard
      </Button>
    </div>
  );
}
