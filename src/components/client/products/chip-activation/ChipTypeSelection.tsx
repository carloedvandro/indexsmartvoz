
import { Button } from "@/components/ui/button";
import { CreditCard, Wifi } from "lucide-react";

interface ChipTypeSelectionProps {
  onSelectChipType: (type: 'physical' | 'esim') => void;
}

export function ChipTypeSelection({ onSelectChipType }: ChipTypeSelectionProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[240px] mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">Escolha o tipo de chip</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-5">
        <Button
          onClick={() => onSelectChipType('physical')}
          className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-gray-50 border-2 border-[#8425af] text-[#8425af]"
          variant="outline"
        >
          <CreditCard size={24} />
          <div className="text-center">
            <p className="font-semibold text-sm">Sim card</p>
            <p className="text-xs text-gray-600">Chip tradicional</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelectChipType('esim')}
          className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-gray-50 border-2 border-[#8425af] text-[#8425af]"
          variant="outline"
        >
          <Wifi size={24} />
          <div className="text-center">
            <p className="font-semibold text-sm">Esim</p>
            <p className="text-xs text-gray-600">Chip Virtual</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
