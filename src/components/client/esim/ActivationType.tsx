
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

type ActivationTypeProps = {
  onSelect: (type: 'self' | 'collaborator') => void;
};

export function ActivationType({ onSelect }: ActivationTypeProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Selecione o tipo de ativação
      </h2>
      
      <div className="max-w-sm mx-auto">
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelect('self')}
        >
          <div className="flex flex-col items-center space-y-4">
            <User className="w-12 h-12 text-[#5f0889]" />
            <h3 className="text-xl font-medium">Para Mim</h3>
            <p className="text-center text-gray-600">
              Ativar eSIM no meu próprio dispositivo
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
