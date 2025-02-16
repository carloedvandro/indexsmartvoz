
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
};

export function DeviceSelector({ onSelect }: DeviceSelectorProps) {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Vamos começar escolhendo o sistema do celular que vai ter o eSIM ativado
        </h2>
      </div>

      <div className="bg-[#f8f7ff] border border-[#9b87f5]/20 rounded-lg p-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-[#9b87f5]" />
        <p className="text-sm text-gray-600">
          O aparelho precisa ter um eSIM pra ter o chip ativado
        </p>
      </div>

      <div className="space-y-4">
        <div 
          className="p-4 border rounded-lg cursor-pointer hover:border-[#9b87f5] group transition-all"
          onClick={() => onSelect('android')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="device"
              id="android"
              className="mt-1 accent-[#9b87f5]"
              checked
              readOnly
            />
            <label htmlFor="android" className="text-lg font-medium block">
              Android
            </label>
          </div>
        </div>

        <div 
          className="p-4 border rounded-lg cursor-pointer hover:border-[#9b87f5] group transition-all"
          onClick={() => onSelect('ios')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="device"
              id="ios"
              className="mt-1 accent-[#9b87f5]"
            />
            <label htmlFor="ios" className="text-lg font-medium block">
              iOS (iPhone)
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline"
          className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
        >
          Voltar
        </Button>
        <Button 
          onClick={() => onSelect('android')}
          className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          Continuar
        </Button>
        <Button 
          variant="link"
          className="text-[#9b87f5]"
        >
          <Info className="w-4 h-4 mr-1" />
          Preciso de ajuda
        </Button>
      </div>
    </div>
  );
}
