
import { supabase } from "@/integrations/supabase/client";

export const validateDeviceIdentifier = async (
  deviceType: 'android' | 'ios',
  identifierType: 'imei' | 'eid',
  value: string
): Promise<boolean> => {
  const { data, error } = await supabase.rpc('validate_device_identifier', {
    p_device_type: deviceType,
    p_identifier_type: identifierType,
    p_value: value
  });

  if (error) {
    console.error('Erro na validação:', error);
    return false;
  }

  return data;
};
