
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { validateDeviceIdentifier } from "@/services/esim/deviceValidationService";
import { useToast } from "@/components/ui/use-toast";

type EIDFormProps = {
  onSubmit: (eid: string) => void;
  onBack: () => void;
  deviceType: 'android' | 'ios';
};

export function EIDForm({ onSubmit, onBack, deviceType }: EIDFormProps) {
  const [eid, setEID] = useState("");
  const [isValidEID, setIsValidEID] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateEID = async (value: string) => {
    if (value.length === 32) {
      setIsValidating(true);
      const isValid = await validateDeviceIdentifier(deviceType, 'eid', value);
      setIsValidEID(isValid);
      setIsValidating(false);

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "EID não autorizado",
          description: "O EID informado não está na lista de dispositivos autorizados. Por favor, verifique se você digitou o número EID correto do seu dispositivo."
        });
      }
    } else {
      setIsValidEID(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEID && !isValidating) {
      onSubmit(eid);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Digite o EID exato do celular que vai ter o eSIM ativado
        </h2>
        <p className="text-sm text-gray-600">
          O número precisa ser idêntico ao que aparece nas configurações do seu celular
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          placeholder="Digite o EID"
          value={eid}
          onChange={async (e) => {
            const value = e.target.value.replace(/[^0-9a-fA-F]/g, '');
            if (value.length <= 32) {
              setEID(value.toUpperCase());
              await validateEID(value);
            }
          }}
          className={`text-center text-lg rounded-lg ${
            isValidEID
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500 ring-green-500 ring-1' 
              : 'border-gray-200 focus:border-[#8425af] focus:ring-[#8425af]'
          }`}
        />

        <p className="text-sm text-gray-600">
          É só ligar pra *#06# e procurar por EID. O número vai aparecer na tela do seu celular.
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
            disabled={!isValidEID || isValidating}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
