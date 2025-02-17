
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

    const { data: deviceData, error } = await supabase.rpc('check_device_compatibility', {
      p_brand: deviceType === 'ios' ? 'Apple' : 'Unknown', // Para iOS, sabemos que é Apple
      p_model: 'iPhone', // Para iOS, todos são iPhone
      p_device_type: deviceType
    });

    console.log('Resposta do banco:', deviceData);

    if (error) {
      console.error('Erro na validação:', error);
      return { isValid: false };
    }

    if (!deviceData || !deviceData[0]?.is_compatible) {
      console.log('Dispositivo não compatível');
      return { isValid: false };
    }

    const result = {
      isValid: true,
      deviceInfo: {
        brand: deviceData[0].device_brand,
        model: deviceData[0].device_model
      }
    };

    console.log('Retornando resultado positivo:', result);
    return result;

  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
