import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface ActivationTypeSelectorProps {
  onSelect: (type: 'sim' | 'esim') => void;
}

export function ActivationTypeSelector({ onSelect }: ActivationTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">Escolha o tipo de ativação</h2>
      
      <Card 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3"
        onClick={() => onSelect('esim')}
      >
        <div className="text-[#660099]">
          <CreditCard className="h-6 w-6" />
        </div>
        <div>
          <span className="text-lg font-medium">Trocar o eSIM</span>
          <p className="text-sm text-gray-600">Ative o chip virtual no seu celular</p>
        </div>
      </Card>

      <Card 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3"
        onClick={() => onSelect('sim')}
      >
        <div className="text-[#660099]">
          <CreditCard className="h-6 w-6" />
        </div>
        <div>
          <span className="text-lg font-medium">Trocar pra SIM card</span>
          <p className="text-sm text-gray-600">Ative o chip físico no seu celular</p>
        </div>
      </Card>
    </div>
  );
}