
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
};

export function ActivationType({ onSelect }: ActivationTypeProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Personalize seu pedido
        </h2>
        <p className="text-gray-600">
          Confira aqui as melhores ofertas para você, cliente Smartvoz.
        </p>
      </div>

      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-[#8425af]"
        onClick={() => onSelect('self')}
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#8425af]/10 p-3 rounded-full">
            <User className="w-8 h-8 text-[#8425af]" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Para Mim</h3>
            <p className="text-gray-600 text-sm">
              Ativar eSIM no meu próprio dispositivo
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
          onClick={() => navigate("/client/dashboard")}
        >
          Voltar
        </Button>
        <Button 
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          onClick={() => onSelect('self')}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
