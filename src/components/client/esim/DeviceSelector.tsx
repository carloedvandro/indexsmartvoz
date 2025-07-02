
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
  onBack: () => void;
};

export function DeviceSelector({ onSelect, onBack }: DeviceSelectorProps) {
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios'>('android');
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-[calc(85%+19px)] md:max-w-[calc(420px+19px)] mx-auto space-y-6 pt-28 bg-white">
      <div className="flex flex-col md:flex-col gap-4 mt-4 w-full">
        <div 
          className={`p-4 rounded-lg border border-[#8425af] cursor-pointer relative w-full
            ${selectedDevice === 'android' 
              ? 'ring-2 ring-[#8425af] ring-offset-0 border-none bg-transparent before:absolute before:inset-[1px] before:border before:border-[#8425af] before:rounded-[7px]'
              : 'hover:border-[#8425af]'
            }`}
          onClick={() => setSelectedDevice('android')}
        >
          <div className="flex items-center justify-between">
            <label htmlFor="android" className="text-lg font-medium text-black">
              Android
            </label>
            <input
              type="radio"
              name="device"
              id="android"
              className="accent-[#8425af]"
              checked={selectedDevice === 'android'}
              onChange={() => setSelectedDevice('android')}
            />
          </div>
        </div>

        <div 
          className={`p-4 rounded-lg border border-[#8425af] cursor-pointer relative w-full
            ${selectedDevice === 'ios' 
              ? 'ring-2 ring-[#8425af] ring-offset-0 border-none bg-transparent before:absolute before:inset-[1px] before:border before:border-[#8425af] before:rounded-[7px]'
              : 'hover:border-[#8425af]'
            }`}
          onClick={() => setSelectedDevice('ios')}
        >
          <div className="flex items-center justify-between">
            <label htmlFor="ios" className="text-lg font-medium text-black">
              iOS (iPhone)
            </label>
            <input
              type="radio"
              name="device"
              id="ios"
              className="accent-[#8425af]"
              checked={selectedDevice === 'ios'}
              onChange={() => setSelectedDevice('ios')}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 mt-8 w-full">
        <Button 
          variant="outline"
          className="border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3 flex-1"
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          onClick={() => onSelect(selectedDevice)}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3 flex-1"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
