
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
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
  const { toast } = useToast();

  const validateIMEI = async (value: string) => {
    if (value.length === 15) {
      setIsValidating(true);
      const isValid = await validateDeviceIdentifier(deviceType, 'imei', value);
      setIsValidIMEI(isValid);
      setIsValidating(false);

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "IMEI não autorizado",
          description: "O IMEI informado não está na lista de dispositivos autorizados. Por favor, verifique se você digitou o número IMEI correto do seu dispositivo."
        });
      }
    } else {
      setIsValidIMEI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidIMEI && !isValidating) {
      onSubmit(imei);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Digite o IMEI exato do celular que vai ter o eSIM ativado
        </h2>
        <p className="text-sm text-gray-600">
          O número precisa ser idêntico ao que aparece nas configurações do seu celular
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          className={`text-center text-lg rounded-lg ${
            isValidIMEI
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500 ring-green-500 ring-1' 
              : 'border-gray-200 focus:border-[#8425af] focus:ring-[#8425af]'
          }`}
        />

        <p className="text-sm text-gray-600">
          É só ir nas configurações do aparelho e digitar IMEI no campo de busca. O número que você precisa vai estar em status como IMEI (eSIM)
        </p>

        <div className="flex justify-between items-center mt-8">
          <Button 
            type="button"
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-6"
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
            type="submit"
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white px-6"
            disabled={!isValidIMEI || isValidating}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
