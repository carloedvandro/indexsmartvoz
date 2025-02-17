
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateDeviceIdentifier } from "@/services/esim/deviceValidationService";
import { useToast } from "@/components/ui/use-toast";

type IMEIFormProps = {
  onSubmit: (imei: string) => void;
  onBack: () => void;
  deviceType: 'android' | 'ios';
};

export function IMEIForm({ onSubmit, onBack, deviceType }: IMEIFormProps) {
  const [imei, setIMEI] = useState("");
  const [isValidIMEI, setIsValidIMEI] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<{ brand: string; model: string; } | null>(null);
  const { toast } = useToast();

  const validateIMEI = async (value: string) => {
    if (value.length < 6) {
      setIsValidIMEI(false);
      setDeviceInfo(null);
      return;
    }

    setIsValidating(true);
    try {
      const validation = await validateDeviceIdentifier(deviceType, 'imei', value);
      console.log('IMEI validation result:', validation);
      
      if (validation.isValid && validation.deviceInfo) {
        setIsValidIMEI(true);
        setDeviceInfo(validation.deviceInfo);
        
        // Só mostra o toast quando completar os 15 dígitos
        if (value.length === 15) {
          toast({
            title: "Dispositivo compatível com eSIM",
            description: `${validation.deviceInfo.brand} ${validation.deviceInfo.model}`,
          });
        }
      } else {
        setIsValidIMEI(false);
        setDeviceInfo(null);
        
        // Só mostra o toast de erro quando completar os 15 dígitos
        if (value.length === 15) {
          toast({
            variant: "destructive",
            title: "IMEI não compatível",
            description: deviceType === 'android' 
              ? "O IMEI informado não corresponde a um dispositivo Android compatível com eSIM."
              : "O IMEI informado não corresponde a um iPhone compatível com eSIM."
          });
        }
      }
    } catch (error) {
      console.error('Erro na validação:', error);
      setIsValidIMEI(false);
      setDeviceInfo(null);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidIMEI && !isValidating) {
      onSubmit(imei);
    }
  };

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Digite o IMEI do {deviceType === 'android' ? 'Android' : 'iPhone'} com eSIM
        </h2>
        <p className="text-black text-sm">
          O número precisa ser idêntico ao que aparece nas configurações do seu celular
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Digite o IMEI"
            value={imei}
            onChange={async (e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 15) {
                setIMEI(value);
                await validateIMEI(value);
              }
            }}
            className={`w-full text-center text-lg rounded-lg border focus:ring-2 focus:ring-[#8425af] ${
              isValidIMEI 
                ? 'ring-2 ring-green-500'
                : imei.length === 15 
                  ? 'ring-2 ring-red-500'
                  : ''
            }`}
          />
          <p className="text-xs text-gray-500 text-center">
            {15 - imei.length} dígitos restantes
          </p>
        </div>

        {deviceInfo && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="font-medium text-green-800">
              {deviceInfo.brand} {deviceInfo.model}
            </p>
            <p className="text-sm text-green-600">
              Dispositivo compatível com eSIM
            </p>
          </div>
        )}

        {!deviceInfo && imei.length === 15 && !isValidating && (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">
              Este IMEI não corresponde a um dispositivo com suporte a eSIM
            </p>
          </div>
        )}

        <p className="text-black text-sm">
          É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
        </p>

        <div className="flex justify-between items-center w-full mt-8">
          <Button 
            type="button"
            variant="outline"
            className="w-[120px] border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button 
            type="submit"
            className="w-[120px] bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3"
            disabled={!isValidIMEI || isValidating}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
