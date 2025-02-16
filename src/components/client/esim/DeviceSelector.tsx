
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

type DeviceSelectorProps = {
  onSelect: (device: 'android' | 'ios') => void;
};

export function DeviceSelector({ onSelect }: DeviceSelectorProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Identidade</span>
        <span>eSIM</span>
        <span>Linhas</span>
      </div>

      <div className="p-6 border rounded-lg w-full">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Selecione o tipo do dispositivo
          </h2>
          
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-[#8425af]" onClick={() => onSelect('android')}>
            <div className="flex items-center gap-4">
              <div className="bg-[#8425af]/10 p-3 rounded-full">
                <Smartphone className="w-8 h-8 text-[#8425af]" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Android</h3>
                <p className="text-gray-600 text-sm">
                  Sistema operacional Android
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-[#8425af]" onClick={() => onSelect('ios')}>
            <div className="flex items-center gap-4">
              <div className="bg-[#8425af]/10 p-3 rounded-full">
                <Smartphone className="w-8 h-8 text-[#8425af]" />
              </div>
              <div>
                <h3 className="text-lg font-medium">iOS (iPhone)</h3>
                <p className="text-gray-600 text-sm">
                  Sistema operacional iOS da Apple
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline"
              className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
              onClick={() => navigate("/client/dashboard")}
            >
              Voltar
            </Button>
            <Button 
              className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
              onClick={() => onSelect('android')}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
