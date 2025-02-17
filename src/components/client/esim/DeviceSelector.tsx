
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
  onBack: () => void;
};

export function DeviceSelector({ onSelect, onBack }: DeviceSelectorProps) {
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios'>('android');

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold max-w-[80%] mx-auto">
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
          className={`p-4 rounded-lg border hover:border-[#8425af] cursor-pointer transition-all ${
            selectedDevice === 'android' ? 'border-[#8425af]' : 'border-gray-200'
          }`}
          onClick={() => setSelectedDevice('android')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="device"
              id="android"
              className="accent-[#8425af]"
              checked={selectedDevice === 'android'}
              onChange={() => setSelectedDevice('android')}
            />
            <label htmlFor="android" className="text-lg font-medium">
              Android
            </label>
          </div>
        </div>

        <div 
          className={`p-4 rounded-lg border hover:border-[#8425af] cursor-pointer transition-all ${
            selectedDevice === 'ios' ? 'border-[#8425af]' : 'border-gray-200'
          }`}
          onClick={() => setSelectedDevice('ios')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="device"
              id="ios"
              className="accent-[#8425af]"
              checked={selectedDevice === 'ios'}
              onChange={() => setSelectedDevice('ios')}
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
          className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg px-8 py-3"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          onClick={() => onSelect(selectedDevice)}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg px-8 py-3"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
