
import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
  onBack: () => void;
};

export function DeviceSelector({ onSelect, onBack }: DeviceSelectorProps) {
  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto">
      <h2 className="text-2xl font-semibold text-center">Qual é o sistema operacional do celular?</h2>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button
          onClick={() => onSelect('ios')}
          className="p-6 border border-[#8425af]/95 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center gap-4"
        >
          <Apple className="w-12 h-12" />
          <span className="font-medium">iOS (iPhone)</span>
        </button>

        <button
          onClick={() => onSelect('android')}
          className="p-6 border border-[#8425af]/95 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center gap-4"
        >
          <Smartphone className="w-12 h-12" />
          <span className="font-medium">Android</span>
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline"
          className="border-[#8425af]/95 text-[#8425af]/95 hover:bg-[#8425af]/95 hover:text-white"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          disabled
          className="bg-[#8425af]/95 hover:bg-[#8425af]/95 text-white opacity-50"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
