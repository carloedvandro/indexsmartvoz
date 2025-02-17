
import { supabase } from "@/integrations/supabase/client";

type DeviceValidationResult = {
  isValid: boolean;
  deviceInfo?: {
    brand: string;
    model: string;
    specs?: {
      tac: string;
      serialNumber: string;
      checkDigit: string;
    };
  };
};

// Interface para tipar o retorno da função RPC
interface DeviceInfo {
  tac: string;
  serialNumber: string;
  checkDigit: string;
}

interface DeviceValidationResponse {
  is_valid: boolean;
  brand: string | null;
  model: string | null;
  device_info: {
    tac: string;
    serialNumber: string;
    checkDigit: string;
  } | null;
}

interface ValidateDeviceParams {
  p_device_type: 'android' | 'ios';
  p_identifier_type: 'imei' | 'eid';
  p_value: string;
}

export const validateDeviceIdentifier = async (
  deviceType: 'android' | 'ios',
  identifierType: 'imei' | 'eid',
  value: string
): Promise<DeviceValidationResult> => {
  console.log('Iniciando validação:', { deviceType, identifierType, value });

  try {
    // Formatar o valor removendo espaços e caracteres especiais
    const cleanValue = value.replace(/[^0-9a-fA-F]/g, '');

    // Validação do comprimento do IMEI
    if (identifierType === 'imei' && cleanValue.length !== 15) {
      console.log('IMEI inválido: comprimento incorreto');
      return { isValid: false };
    }

    // Validação do comprimento do EID
    if (identifierType === 'eid' && cleanValue.length !== 32) {
      console.log('EID inválido: comprimento incorreto');
      return { isValid: false };
    }

    const { data, error } = await supabase.rpc('validate_device_identifier', {
      p_device_type: deviceType,
      p_identifier_type: identifierType,
      p_value: cleanValue
    });

    console.log('Resposta do banco:', data);

    if (error) {
      console.error('Erro na validação:', error);
      return { isValid: false };
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('Nenhum dispositivo encontrado');
      return { isValid: false };
    }

    // Primeiro convertemos para unknown e depois para o tipo correto
    const rawDevice = data[0] as unknown;
    const device = rawDevice as DeviceValidationResponse;
    
    console.log('Device data:', device);

    if (device.is_valid && device.brand && device.model) {
      const result: DeviceValidationResult = {
        isValid: true,
        deviceInfo: {
          brand: device.brand,
          model: device.model,
          specs: device.device_info ? {
            tac: device.device_info.tac,
            serialNumber: device.device_info.serialNumber,
            checkDigit: device.device_info.checkDigit
          } : undefined
        }
      };
      console.log('Retornando resultado positivo:', result);
      return result;
    }

    console.log('Retornando resultado negativo');
    return { isValid: false };
  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
