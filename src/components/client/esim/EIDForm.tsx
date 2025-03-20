
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [deviceInfo, setDeviceInfo] = useState<{ brand: string; model: string; } | null>(null);
  const [lastValidatedEid, setLastValidatedEid] = useState<string>("");
  const { toast } = useToast();

  const validateEID = async (value: string) => {
    if (value.length === 32) {
      setIsValidating(true);
      try {
        const validation = await validateDeviceIdentifier(deviceType, 'eid', value);
        
        if (validation.isValid && validation.deviceInfo) {
          setIsValidEID(true);
          setDeviceInfo(validation.deviceInfo);
          setLastValidatedEid(value);  // Store the last valid EID
          
          toast({
            title: "Dispositivo identificado",
            description: `${validation.deviceInfo.brand} ${validation.deviceInfo.model}`,
          });
        } else {
          setIsValidEID(false);
          setDeviceInfo(null);
          setLastValidatedEid("");  // Clear last valid EID
          
          toast({
            variant: "destructive",
            title: "EID não autorizado",
            description: "O EID informado não corresponde a um dispositivo compatível com eSIM. Verifique se você digitou o número EID correto."
          });
        }
      } catch (error) {
        console.error('Erro na validação do EID:', error);
        setIsValidEID(false);
        setDeviceInfo(null);
        setLastValidatedEid("");  // Clear last valid EID
        
        toast({
          variant: "destructive",
          title: "Erro na validação",
          description: "Ocorreu um erro ao validar o EID. Por favor, tente novamente.",
        });
      } finally {
        setIsValidating(false);
      }
    } else {
      setIsValidEID(false);
      setDeviceInfo(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only allow submission if current EID matches the last validated EID
    if (isValidEID && !isValidating && eid === lastValidatedEid) {
      onSubmit(eid);
    } else if (eid !== lastValidatedEid) {
      toast({
        variant: "destructive",
        title: "EID modificado",
        description: "O EID foi modificado após a validação. Por favor, valide novamente."
      });
      setIsValidEID(false);
      setDeviceInfo(null);
    }
  };

  return (
    <div className="w-full max-w-[90%] md:max-w-[400px] mx-auto space-y-6 pt-44">
      <div className="text-center space-y-2">
        <img 
          src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
          alt="Smartvoz Logo" 
          className="h-[140px] object-contain mx-auto mix-blend-multiply opacity-90 contrast-125"
        />
        <p className="text-black text-[15.7px] text-center mx-auto max-w-[320px]">
          O número precisa ser idêntico ao que aparece nas configurações do seu celular
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <Input
          type="text"
          placeholder="Digite o EID"
          value={eid}
          onChange={async (e) => {
            const value = e.target.value.replace(/[^0-9a-fA-F]/g, '');
            if (value.length <= 32) {
              setEID(value.toUpperCase());
              
              // If EID changed from previously validated one, reset validation state
              if (lastValidatedEid && value !== lastValidatedEid) {
                setIsValidEID(false);
                setDeviceInfo(null);
              }
              
              await validateEID(value);
            }
          }}
          className={`w-full text-center text-lg rounded-lg border focus:ring-2 focus:ring-[#8425af] ${
            deviceInfo ? 'ring-2 ring-green-500' : 
            eid.length === 32 && !deviceInfo ? 'ring-2 ring-red-500' : ''
          }`}
        />

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

        <p className="text-sm text-gray-600">
          É só ligar pra *#06# e procurar por EID. O número vai aparecer na tela do seu celular.
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
          <Button 
            type="submit"
            className="flex-1 bg-[#8425af] hover:bg-[#6c1e8f] text-white rounded-lg py-3"
            disabled={!isValidEID || isValidating || eid !== lastValidatedEid}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
