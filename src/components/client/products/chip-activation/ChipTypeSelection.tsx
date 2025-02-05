
import { Button } from "@/components/ui/button";
import { Microchip } from "lucide-react";

interface ChipTypeSelectionProps {
  onSelectChipType: (type: 'physical' | 'esim') => void;
}

export function ChipTypeSelection({ onSelectChipType }: ChipTypeSelectionProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[320px] mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">Escolha o tipo de chip</h2>
      
      <div className="flex flex-col gap-10 w-full mt-5">
        <Button
          onClick={() => onSelectChipType('physical')}
          className="flex flex-col items-center gap-4 p-4 bg-white hover:bg-gray-50 border-2 border-[#8425af] text-[#8425af] w-[320px] mx-auto"
          variant="outline"
        >
          <img 
            src="/lovable-uploads/f5d55154-a62e-475f-b8de-b65ac463b3fc.png" 
            alt="Chip físico"
            className="w-24 h-auto object-contain"
          />
          <div className="flex items-center gap-2">
            <Microchip className="w-4 h-4" />
            <p className="font-semibold text-sm">Trocar o SIM card</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelectChipType('esim')}
          className="flex flex-col items-center gap-4 p-4 bg-white hover:bg-gray-50 border-2 border-[#8425af] text-[#8425af] w-[320px] mx-auto"
          variant="outline"
        >
          <img 
            src="/lovable-uploads/9995b487-e538-4233-837f-ed73b70697da.png" 
            alt="eSIM"
            className="w-24 h-auto object-contain"
          />
          <p className="font-semibold text-sm">Trocar pra eSIM</p>
        </Button>
      </div>
    </div>
  );
}
