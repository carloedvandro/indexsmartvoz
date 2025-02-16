
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
  onBack: () => void;
};

export function DeviceSelector({ onSelect, onBack }: DeviceSelectorProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Vamos começar escolhendo o sistema do celular que vai ter o eSIM ativado
        </h2>
      </div>

      <div className="bg-[#212529] text-white rounded-lg p-4 flex items-center gap-2">
        <Info className="w-5 h-5" />
        <p className="text-sm">
          O aparelho precisa ter um eSIM pra ter o chip ativado
        </p>
      </div>

      <div className="space-y-4 mt-4">
        <div 
          className="p-4 rounded-lg border border-[#8425af] hover:border-[#8425af] cursor-pointer transition-all"
          onClick={() => onSelect('android')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="device"
              id="android"
              className="accent-[#8425af]"
              checked
              readOnly
            />
            <label htmlFor="android" className="text-lg font-medium">
              Android
            </label>
          </div>
        </div>

        <div 
          className="p-4 rounded-lg border border-gray-200 hover:border-[#8425af] cursor-pointer transition-all"
          onClick={() => onSelect('ios')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="device"
              id="ios"
              className="accent-[#8425af]"
            />
            <label htmlFor="ios" className="text-lg font-medium">
              iOS (iPhone)
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline"
          className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white px-6"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          variant="link"
          className="text-[#8425af]"
        >
          <Info className="w-4 h-4 mr-1" />
          Preciso de ajuda
        </Button>
        <Button 
          onClick={() => onSelect('android')}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-6"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
