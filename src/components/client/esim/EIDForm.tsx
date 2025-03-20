
import { useState, useEffect, useRef } from "react";
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
  const { toast } = useToast();
  
  // Use ref to store the EXACT validated EID
  const validatedEidRef = useRef<string>("");
  
  // Track if validation has been attempted
  const [validationAttempted, setValidationAttempted] = useState(false);
  
  // Audio para feedback
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Criar elemento de áudio
    audioRef.current = new Audio('/beep.mp3');
  }, []);

  const playBeep = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Erro ao reproduzir áudio:", e));
    }
  };

  const validateEID = async (value: string) => {
    // Não permitir validação se o EID não tiver exatamente 32 caracteres
    if (value.length !== 32) {
      console.log("EID deve ter exatamente 32 caracteres");
      setIsValidEID(false);
      setDeviceInfo(null);
      validatedEidRef.current = "";
      return;
    }
    
    setIsValidating(true);
    setValidationAttempted(true);
    
    try {
      console.log("Validando EID:", value);
      const validation = await validateDeviceIdentifier(deviceType, 'eid', value);
      
      if (validation.isValid && validation.deviceInfo) {
        setIsValidEID(true);
        setDeviceInfo(validation.deviceInfo);
        validatedEidRef.current = value; // Armazenar o EID exato validado
        playBeep();
        
        toast({
          title: "Dispositivo identificado",
          description: `${validation.deviceInfo.brand} ${validation.deviceInfo.model}`,
        });
      } else {
        setIsValidEID(false);
        setDeviceInfo(null);
        validatedEidRef.current = ""; // Limpar o EID validado
        
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
      validatedEidRef.current = ""; // Limpar o EID validado
      
      toast({
        variant: "destructive",
        title: "Erro na validação",
        description: "Ocorreu um erro ao validar o EID. Por favor, tente novamente.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificação RIGOROSA - o EID deve ser EXATAMENTE igual ao validado
    if (eid === validatedEidRef.current && isValidEID && !isValidating) {
      onSubmit(eid);
    } else {
      // Se o EID foi modificado ou não é válido
      if (eid !== validatedEidRef.current) {
        toast({
          variant: "destructive",
          title: "EID modificado ou inválido",
          description: "O EID foi modificado após a validação ou ainda não foi validado. Valide novamente."
        });
      }
      
      // Forçar uma nova validação se tiver comprimento correto
      if (eid.length === 32) {
        validateEID(eid);
      }
    }
  };

  const handleEidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limitar a 32 caracteres e permitir apenas dígitos hexadecimais
    const rawValue = e.target.value.replace(/[^0-9a-fA-F]/g, '');
    
    if (rawValue.length <= 32) {
      const upperValue = rawValue.toUpperCase();
      
      // Definir o novo valor
      setEID(upperValue);
      
      // Se o valor for diferente do EID validado, redefinir a validação
      if (upperValue !== validatedEidRef.current) {
        setIsValidEID(false);
        // Mantemos deviceInfo para melhor UX até que seja feita nova validação
      }
    }
  };

  // Efeito para validar automaticamente quando o EID tiver 32 caracteres
  useEffect(() => {
    if (eid.length === 32 && eid !== validatedEidRef.current) {
      const timeoutId = setTimeout(() => {
        validateEID(eid);
      }, 500); // Aguardar meio segundo para evitar múltiplas validações
      
      return () => clearTimeout(timeoutId);
    }
  }, [eid, deviceType]);

  // Determinar a classe de borda do input com base no status
  const getBorderClass = () => {
    if (eid.length < 32) return '';
    if (eid === validatedEidRef.current && isValidEID) return 'ring-2 ring-green-500';
    if (validationAttempted) return 'ring-2 ring-red-500';
    return '';
  };
  
  // Determinar se o botão continuar deve estar desabilitado
  const isContinueDisabled = !isValidEID || isValidating || eid !== validatedEidRef.current;

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
          className={`w-full text-center text-lg rounded-lg border focus:ring-2 focus:ring-[#8425af] ${getBorderClass()}`}
          maxLength={32}
        />

        {deviceInfo && (
          <div className={`text-center p-4 rounded-lg ${isValidEID && eid === validatedEidRef.current ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-medium ${isValidEID && eid === validatedEidRef.current ? 'text-green-800' : 'text-red-800'}`}>
              {deviceInfo.brand} {deviceInfo.model}
            </p>
            <p className={`text-sm ${isValidEID && eid === validatedEidRef.current ? 'text-green-600' : 'text-red-600'}`}>
              {isValidEID && eid === validatedEidRef.current 
                ? "Dispositivo compatível com eSIM" 
                : "EID alterado após validação. Por favor, valide novamente."}
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
            className={`flex-1 ${isContinueDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8425af] hover:bg-[#6c1e8f]'} text-white rounded-lg py-3`}
            disabled={isContinueDisabled}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}
