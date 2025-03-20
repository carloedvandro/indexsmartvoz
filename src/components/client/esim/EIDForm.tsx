
import { useState, useEffect } from "react";
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

  // Este efeito garantirá que o estado de validação seja limpo sempre que o EID mudar
  useEffect(() => {
    // Se o EID atual for diferente do último EID validado com sucesso, resetamos a validação
    if (eid !== lastValidatedEid) {
      setIsValidEID(false);
      // Não limpamos o deviceInfo aqui para melhorar a UX, apenas quando a validação falhar
    }
  }, [eid, lastValidatedEid]);

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
    
    // Verificar se o EID atual é exatamente igual ao último EID validado com sucesso
    if (isValidEID && !isValidating && eid === lastValidatedEid) {
      onSubmit(eid);
    } else {
      // Mostrar um erro se o EID foi modificado após a validação
      if (eid !== lastValidatedEid) {
        toast({
          variant: "destructive",
          title: "EID modificado",
          description: "O EID foi modificado após a validação. Por favor, valide novamente."
        });
      }
      // Resetar o estado para forçar uma nova validação
      setIsValidEID(false);
    }
  };

  const handleEidChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limpar caracteres inválidos
    const value = e.target.value.replace(/[^0-9a-fA-F]/g, '');
    
    if (value.length <= 32) {
      const upperValue = value.toUpperCase();
      setEID(upperValue);
      
      // Se o valor mudou do último validado, desabilitar a validação
      if (upperValue !== lastValidatedEid) {
        setIsValidEID(false);
        // Mantém as informações do dispositivo visíveis até a próxima validação
      }
      
      // Apenas validar quando tiver 32 caracteres
      if (value.length === 32) {
        await validateEID(upperValue);
      }
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
          onChange={handleEidChange}
          className={`w-full text-center text-lg rounded-lg border focus:ring-2 focus:ring-[#8425af] ${
            deviceInfo && isValidEID && eid === lastValidatedEid ? 'ring-2 ring-green-500' : 
            eid.length === 32 && (!deviceInfo || !isValidEID || eid !== lastValidatedEid) ? 'ring-2 ring-red-500' : ''
          }`}
        />

        {deviceInfo && (
          <div className={`text-center p-4 rounded-lg ${isValidEID && eid === lastValidatedEid ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-medium ${isValidEID && eid === lastValidatedEid ? 'text-green-800' : 'text-red-800'}`}>
              {deviceInfo.brand} {deviceInfo.model}
            </p>
            <p className={`text-sm ${isValidEID && eid === lastValidatedEid ? 'text-green-600' : 'text-red-600'}`}>
              {isValidEID && eid === lastValidatedEid 
                ? "Dispositivo compatível com eSIM" 
                : "EID modificado após validação. Por favor, valide novamente."}
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
