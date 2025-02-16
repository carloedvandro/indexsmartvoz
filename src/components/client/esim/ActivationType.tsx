
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
};

export function ActivationType({ onSelect }: ActivationTypeProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Identidade</span>
        <span>eSIM</span>
        <span>Linhas</span>
      </div>

      <div className="p-6 border rounded-lg w-full">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Selecione o tipo de ativação
          </h2>
          
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-[#8425af] hover:border-[#6c1e8f]"
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
        </div>
      </div>
    </div>
  );
}
