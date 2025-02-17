
import { supabase } from "@/integrations/supabase/client";

type DeviceValidationResult = {
  isValid: boolean;
  deviceInfo?: {
    brand: string;
    model: string;
  };
};

export const validateDeviceIdentifier = async (
  deviceType: 'android' | 'ios',
  identifierType: 'imei' | 'eid',
  value: string
): Promise<DeviceValidationResult> => {
  if (identifierType === 'imei') {
    // Primeiro verifica se é um dispositivo eSIM válido
    const { data: deviceData, error: deviceError } = await supabase.rpc('validate_esim_device', {
      p_imei: value
    });

    if (deviceError) {
      console.error('Erro na validação do dispositivo:', deviceError);
      return { isValid: false };
    }

    if (deviceData?.[0]?.is_valid) {
      return {
        isValid: true,
        deviceInfo: {
          brand: deviceData[0].brand,
          model: deviceData[0].model
        }
      };
    }

    return { isValid: false };
  } else {
    // Para EID, usa a nova função de validação
    const { data: deviceData, error } = await supabase.rpc('validate_device_identifier', {
      p_device_type: deviceType,
      p_identifier_type: identifierType,
      p_value: value
    });

    if (error) {
      console.error('Erro na validação:', error);
      return { isValid: false };
    }

    if (deviceData?.[0]?.is_valid) {
      return {
        isValid: true,
        deviceInfo: {
          brand: deviceData[0].brand,
          model: deviceData[0].model
        }
      };
    }

    return { isValid: false };
  }
};
