
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

const validateImeiChecksum = (imei: string): boolean => {
  let sum = 0;
  const length = imei.length;

  // O último dígito é o dígito verificador
  const checkDigit = parseInt(imei.charAt(length - 1));

  // Percorre os dígitos da direita para a esquerda, exceto o dígito verificador
  for (let i = length - 2; i >= 0; i--) {
    let digit = parseInt(imei.charAt(i));
    
    // Multiplica os dígitos alternados por 2
    if ((length - 1 - i) % 2 === 1) {
      digit *= 2;
      // Se o resultado for maior que 9, soma os dígitos
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }
    sum += digit;
  }

  // Calcula o dígito verificador esperado
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
    // Formatar o valor removendo espaços e caracteres especiais
    const cleanValue = value.replace(/[^0-9a-fA-F]/g, '');

    // Validação básica do IMEI
    if (identifierType === 'imei') {
      if (cleanValue.length !== 15) {
        console.log('IMEI inválido: comprimento incorreto');
        return { isValid: false };
      }

      // Validação do checksum do IMEI
      if (!validateImeiChecksum(cleanValue)) {
        console.log('IMEI inválido: checksum incorreto');
        return { isValid: false };
      }
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

    const [result] = data;
    if (!result.is_valid) {
      return { isValid: false };
    }

    return {
      isValid: true,
      deviceInfo: {
        brand: result.brand || (deviceType === 'ios' ? 'Apple' : 'Android'),
        model: result.model || (deviceType === 'ios' ? 'iPhone' : 'Smartphone'),
        specs: result.device_info
      }
    };
  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
