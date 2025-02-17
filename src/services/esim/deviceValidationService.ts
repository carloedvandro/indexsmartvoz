
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
  console.log('Validating device:', { deviceType, identifierType, value });

  const { data: deviceData, error } = await supabase.rpc('validate_device_identifier', {
    p_device_type: deviceType,
    p_identifier_type: identifierType,
    p_value: value
  });

  console.log('Validation result:', { deviceData, error });

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
};
