
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateDeviceIdentifier } from "@/services/esim/deviceValidationService";
import type { DeviceInfo } from "@/services/esim/types/deviceTypes";

export function useIMEIValidation(deviceType: 'android' | 'ios') {
  const [imei, setIMEI] = useState("");
  const [isValidIMEI, setIsValidIMEI] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
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
        
        // Extract modelNumber from specs if available or provide a fallback
        const modelNumber = validation.deviceInfo.specs?.modelNumber || validation.deviceInfo.model;
        
        // Create a properly structured DeviceInfo object
        const deviceInfoData: DeviceInfo = {
          brand: validation.deviceInfo.brand,
          model: validation.deviceInfo.model,
          modelNumber: modelNumber
        };
        
        setDeviceInfo(deviceInfoData);
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

  return {
    imei,
    setIMEI,
    isValidIMEI,
    isValidating,
    deviceInfo,
    validateIMEI
  };
}
