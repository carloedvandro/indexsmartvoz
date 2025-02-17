
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

    const { data: deviceData, error } = await supabase.rpc('validate_device_identifier', {
      p_device_type: deviceType,
      p_identifier_type: identifierType,
      p_value: cleanValue
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
      const result: DeviceValidationResult = {
        isValid: true,
        deviceInfo: {
          brand: deviceData[0].brand,
          model: deviceData[0].model,
          specs: deviceData[0].device_info ? {
            tac: deviceData[0].device_info.tac,
            serialNumber: deviceData[0].device_info.serialNumber,
            checkDigit: deviceData[0].device_info.checkDigit
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
