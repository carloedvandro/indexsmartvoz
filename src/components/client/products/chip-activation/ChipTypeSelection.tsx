
import { Button } from "@/components/ui/button";
import { CreditCard, Wifi } from "lucide-react";

interface ChipTypeSelectionProps {
  onSelectChipType: (type: 'physical' | 'esim') => void;
}

export function ChipTypeSelection({ onSelectChipType }: ChipTypeSelectionProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[350px] mx-auto">
      <h2 className="text-xl font-semibold text-center mb-8">Escolha o tipo de chip</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Button
          onClick={() => onSelectChipType('physical')}
          className="flex flex-col items-center gap-4 p-8 bg-white hover:bg-gray-50 border-2 border-[#8425af] text-[#8425af]"
          variant="outline"
        >
          <CreditCard size={48} />
          <div className="text-center">
            <p className="font-semibold">Sim card</p>
            <p className="text-sm text-gray-600">Chip tradicional</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelectChipType('esim')}
          className="flex flex-col items-center gap-4 p-8 bg-white hover:bg-gray-50 border-2 border-[#8425af] text-[#8425af]"
          variant="outline"
        >
          <Wifi size={48} />
          <div className="text-center">
            <p className="font-semibold">Esim</p>
            <p className="text-sm text-gray-600">Chip Virtual</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
