
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SlideButton } from "@/components/ui/slide-button";
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
  const [deviceInfo, setDeviceInfo] = useState<{
    brand: string;
    model: string;
    specs?: {
      tac: string;
      serialNumber: string;
      checkDigit: string;
      marketName?: string;
      modelNumber?: string;
      manufacturer?: string;
    };
  } | null>(null);
  const { toast } = useToast();

  const validateIMEI = async (value: string) => {
    if (value.length !== 15) return;

    setIsValidating(true);
    try {
      console.log('Iniciando validação do IMEI:', value);
      const validation = await validateDeviceIdentifier(deviceType, 'imei', value);
      console.log('Resultado da validação:', validation);

      if (validation.isValid && validation.deviceInfo) {
        setIsValidIMEI(true);
        setDeviceInfo(validation.deviceInfo);

        toast({
          title: "Dispositivo compatível com eSIM",
          description: validation.deviceInfo.specs?.marketName || validation.deviceInfo.model,
        });
      } else {
        setIsValidIMEI(false);
        setDeviceInfo(null);

        toast({
          variant: "destructive",
          title: "IMEI não compatível",
          description: deviceType === 'android'
            ? "O IMEI informado não corresponde a um dispositivo Android compatível com eSIM."
            : "O IMEI informado não corresponde a um iPhone compatível com eSIM."
        });
      }
    } catch (error) {
      console.error('Erro na validação:', error);
      setIsValidIMEI(false);
      setDeviceInfo(null);

      toast({
        variant: "destructive",
        title: "Erro na validação",
        description: "Ocorreu um erro ao validar o IMEI. Por favor, tente novamente.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidIMEI && !isValidating && imei.length === 15) {
      onSubmit(imei);
    }
  };

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6 pt-44">

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
                if (value.length === 15) {
                  await validateIMEI(value);
                } else {
                  setIsValidIMEI(false);
                  setDeviceInfo(null);
                }
              }
            }}
            className="w-full text-center text-lg rounded-lg border border-[#8425af] focus:outline-none focus:ring-0 focus:border-[#8425af] hover:border-[#8425af]"
          />
          <p className="text-xs text-gray-500 text-center">
            {15 - imei.length} dígitos restantes
          </p>
        </div>

        {!deviceInfo && imei.length === 15 && !isValidating && (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">
              Este IMEI não corresponde a um dispositivo com suporte a eSIM
            </p>
          </div>
        )}

        <p className="text-black text-sm">
          <ol className="space-y-1 text-blue-700">
            <li>1. Ligue para *#06# no seu celular</li>
            <li>2. Procure pela linha "imei" na tela</li>
            <li>3. Digite o codigo</li>
          </ol>
        </p>

        <div className="flex justify-between items-center w-full mt-8 gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white rounded-lg py-3"
            onClick={onBack}
          >
            Voltar
          </Button>
          <div className="flex-1">
            <SlideButton
              onClick={() => {
                if (isValidIMEI && !isValidating && imei.length === 15) {
                  onSubmit(imei);
                }
              }}
              className="w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3"
              disabled={!isValidIMEI || isValidating || imei.length !== 15}
            >
              Continuar
            </SlideButton>
          </div>
        </div>
      </form>
    </div>
  );
}
