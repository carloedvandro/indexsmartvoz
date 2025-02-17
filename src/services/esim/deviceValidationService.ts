
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
  console.log('Iniciando validação:', { deviceType, identifierType, value });

  try {
    // Validação do comprimento do IMEI
    if (identifierType === 'imei' && value.length !== 15) {
      console.log('IMEI inválido: comprimento incorreto');
      return { isValid: false };
    }

    // Validação do comprimento do EID
    if (identifierType === 'eid' && value.length !== 32) {
      console.log('EID inválido: comprimento incorreto');
      return { isValid: false };
    }

    const { data: deviceData, error } = await supabase.rpc('validate_device_identifier', {
      p_device_type: deviceType,
      p_identifier_type: identifierType,
      p_value: value
    });

    console.log('Resposta do banco:', deviceData);

    if (error) {
      console.error('Erro na validação:', error);
      return { isValid: false };
    }

    if (!deviceData || deviceData.length === 0) {
      console.log('Nenhum dispositivo encontrado');
      return { isValid: false };
    }

    const isValid = deviceData[0]?.is_valid === true;
    console.log('Dispositivo é válido?', isValid);

    if (isValid && deviceData[0].brand && deviceData[0].model) {
      const result = {
        isValid: true,
        deviceInfo: {
          brand: deviceData[0].brand,
          model: deviceData[0].model
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
