import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface ActivationTypeSelectorProps {
  onSelect: (type: 'sim' | 'esim') => void;
}

export function ActivationTypeSelector({ onSelect }: ActivationTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <Card 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3"
        onClick={() => onSelect('esim')}
      >
        <div className="text-[#660099]">
          <CreditCard className="h-6 w-6" />
        </div>
        <span className="text-lg">Trocar o eSIM</span>
      </Card>

      <Card 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3"
        onClick={() => onSelect('sim')}
      >
        <div className="text-[#660099]">
          <CreditCard className="h-6 w-6" />
        </div>
        <span className="text-lg">Trocar pra SIM card</span>
      </Card>
    </div>
  );
}