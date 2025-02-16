
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
};

export function DeviceSelector({ onSelect }: DeviceSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Selecione o tipo do dispositivo
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Smartphone className="w-12 h-12 text-[#5f0889]" />
            <h3 className="text-xl font-medium">Android</h3>
            <Button 
              onClick={() => onSelect('android')}
              className="w-full bg-[#5f0889] hover:bg-[#4a0668]"
            >
              Selecionar
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Smartphone className="w-12 h-12 text-[#5f0889]" />
            <h3 className="text-xl font-medium">iOS (iPhone)</h3>
            <Button 
              onClick={() => onSelect('ios')}
              className="w-full bg-[#5f0889] hover:bg-[#4a0668]"
            >
              Selecionar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
