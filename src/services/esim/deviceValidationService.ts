
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
      marketName?: string;
      modelNumber?: string;
      manufacturer?: string;
    };
  };
};

type DeviceValidationResponse = {
  is_valid: boolean;
  brand: string;
  model: string;
  device_info: {
    tac: string;
    serialNumber: string;
    checkDigit: string;
    marketName: string;
    modelNumber: string;
    manufacturer: string;
  };
};

const validateImeiChecksum = (imei: string): boolean => {
  let sum = 0;
  const length = imei.length;
  const checkDigit = parseInt(imei.charAt(length - 1));
  
  for (let i = length - 2; i >= 0; i--) {
    let digit = parseInt(imei.charAt(i));
    if ((length - 1 - i) % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }
    sum += digit;
  }

  const expectedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === expectedCheckDigit;
};

export const validateDeviceIdentifier = async (
  deviceType: 'android' | 'ios',
  identifierType: 'imei' | 'eid',
  value: string
): Promise<DeviceValidationResult> => {
  console.log('Iniciando validação:', { deviceType, identifierType, value });

  try {
    const cleanValue = value.replace(/[^0-9a-fA-F]/g, '');

    if (identifierType === 'imei') {
      if (cleanValue.length !== 15) {
        console.log('IMEI inválido: comprimento incorreto');
        return { isValid: false };
      }

      if (!validateImeiChecksum(cleanValue)) {
        console.log('IMEI inválido: checksum incorreto');
        return { isValid: false };
      }
    }

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

    const [result] = data as DeviceValidationResponse[];
    if (!result.is_valid) {
      return { isValid: false };
    }

    const deviceInfo = result.device_info && typeof result.device_info === 'object' ? {
      tac: String(result.device_info.tac || ''),
      serialNumber: String(result.device_info.serialNumber || ''),
      checkDigit: String(result.device_info.checkDigit || ''),
      marketName: String(result.device_info.marketName || ''),
      modelNumber: String(result.device_info.modelNumber || ''),
      manufacturer: String(result.device_info.manufacturer || '')
    } : undefined;

    return {
      isValid: true,
      deviceInfo: {
        brand: result.brand || (deviceType === 'ios' ? 'Apple' : 'Android'),
        model: result.model || (deviceType === 'ios' ? 'iPhone' : 'Smartphone'),
        specs: deviceInfo
      }
    };
  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
