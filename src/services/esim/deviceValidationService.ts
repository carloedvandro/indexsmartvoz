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

const getDeviceInfo = (tac: string, deviceType: string): { brand: string; model: string; modelNumber: string } => {
  // iPhone models
  if (deviceType === 'ios') {
    const iphoneModels: { [key: string]: { model: string; modelNumber: string } } = {
      '35672811': { model: 'iPhone 15 Pro Max', modelNumber: 'A2850' },
      '35672812': { model: 'iPhone 15 Pro', modelNumber: 'A2848' },
      '35672813': { model: 'iPhone 15 Plus', modelNumber: 'A2849' },
      '35672814': { model: 'iPhone 15', modelNumber: 'A2847' },
      '35672815': { model: 'iPhone 14 Pro Max', modelNumber: 'A2650' },
      '35672816': { model: 'iPhone 14 Pro', modelNumber: 'A2649' },
      '35672817': { model: 'iPhone 14 Plus', modelNumber: 'A2632' },
      '35672818': { model: 'iPhone 14', modelNumber: 'A2631' },
      '35672819': { model: 'iPhone 13 Pro Max', modelNumber: 'A2484' },
      '35672820': { model: 'iPhone 13 Pro', modelNumber: 'A2483' },
      '35672821': { model: 'iPhone 13', modelNumber: 'A2482' },
      '35672822': { model: 'iPhone 13 Mini', modelNumber: 'A2481' },
      '35672823': { model: 'iPhone 12 Pro Max', modelNumber: 'A2342' },
      '35672824': { model: 'iPhone 12 Pro', modelNumber: 'A2341' },
      '35672825': { model: 'iPhone 12', modelNumber: 'A2172' },
      '35672826': { model: 'iPhone 12 Mini', modelNumber: 'A2176' },
      '35672827': { model: 'iPhone 11 Pro Max', modelNumber: 'A2161' },
      '35672828': { model: 'iPhone 11 Pro', modelNumber: 'A2160' },
      '35672829': { model: 'iPhone 11', modelNumber: 'A2111' },
    };
    
    const prefix = tac.substring(0, 8);
    if (iphoneModels[prefix]) {
      return {
        brand: 'Apple',
        model: iphoneModels[prefix].model,
        modelNumber: iphoneModels[prefix].modelNumber
      };
    }
    
    return { brand: 'Apple', model: 'iPhone', modelNumber: tac };
  }

  // Android models
  const androidModels: { [key: string]: { brand: string; model: string; modelNumber: string } } = {
    // Samsung models
    '35137181': { brand: 'Samsung', model: 'Galaxy S23 Ultra', modelNumber: 'SM-S918B' },
    '35137182': { brand: 'Samsung', model: 'Galaxy S23+', modelNumber: 'SM-S916B' },
    '35137183': { brand: 'Samsung', model: 'Galaxy S23', modelNumber: 'SM-S911B' },
    '35580101': { brand: 'Samsung', model: 'Galaxy S22 Ultra', modelNumber: 'SM-S908B' },
    '35580102': { brand: 'Samsung', model: 'Galaxy S22+', modelNumber: 'SM-S906B' },
    '35580103': { brand: 'Samsung', model: 'Galaxy S22', modelNumber: 'SM-S901B' },
    '35580104': { brand: 'Samsung', model: 'Galaxy Z Fold 5', modelNumber: 'SM-F946B' },
    '35580105': { brand: 'Samsung', model: 'Galaxy Z Flip 5', modelNumber: 'SM-F731B' },

    // Motorola models
    '35235101': { brand: 'Motorola', model: 'Edge 40 Pro', modelNumber: 'XT2301-4' },
    '35235102': { brand: 'Motorola', model: 'Edge 40', modelNumber: 'XT2303-1' },
    '35235103': { brand: 'Motorola', model: 'Edge 30 Ultra', modelNumber: 'XT2241-1' },
    '35235104': { brand: 'Motorola', model: 'Edge 30 Pro', modelNumber: 'XT2201-1' },

    // Nokia models
    '35728101': { brand: 'Nokia', model: 'X30 5G', modelNumber: 'TA-1460' },
    '35728102': { brand: 'Nokia', model: 'G60 5G', modelNumber: 'TA-1447' },
    '35728103': { brand: 'Nokia', model: 'XR20', modelNumber: 'TA-1362' },
  };

  const prefix = tac.substring(0, 8);
  if (androidModels[prefix]) {
    return androidModels[prefix];
  }

  // Default case if no specific model is found
  return {
    brand: deviceType === 'ios' ? 'Apple' : 'Android',
    model: deviceType === 'ios' ? 'iPhone' : 'Smartphone',
    modelNumber: tac
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

      const tac = cleanValue.substring(0, 8);
      const serialNumber = cleanValue.substring(8, 14);
      const checkDigit = cleanValue.substring(14);
      
      const deviceDetails = getDeviceInfo(tac, deviceType);

      return {
        isValid: true,
        deviceInfo: {
          brand: deviceDetails.brand,
          model: deviceDetails.model,
          specs: {
            tac,
            serialNumber,
            checkDigit,
            marketName: deviceDetails.model,
            modelNumber: deviceDetails.modelNumber,
            manufacturer: deviceDetails.brand
          }
        }
      };
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
