
import { supabase } from "@/integrations/supabase/client";

export interface DeviceValidationResult {
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
}

interface DeviceValidationResponse {
  is_valid: boolean;
  brand?: string;
  model?: string;
  device_info?: any;
}

export const validateDeviceIdentifier = async (
  deviceType: 'android' | 'ios',
  identifierType: 'imei' | 'eid',
  value: string
): Promise<DeviceValidationResult> => {
  console.log('Iniciando validação:', { deviceType, identifierType, value });

  try {
    const cleanValue = value.trim().replace(/[^0-9a-fA-F]/g, '').toUpperCase();
    
    if (cleanValue.toUpperCase() !== value.toUpperCase()) {
      console.log('Identificador inválido: contém caracteres não permitidos');
      return { isValid: false };
    }

    if (identifierType === 'imei') {
      if (cleanValue.length !== 15) {
        console.log('IMEI inválido: comprimento incorreto');
        return { isValid: false };
      }

      // Simulação de validação para desenvolvimento
      return {
        isValid: true,
        deviceInfo: {
          brand: deviceType === 'ios' ? 'Apple' : 'Samsung',
          model: deviceType === 'ios' ? 'iPhone' : 'Galaxy',
          specs: {
            tac: cleanValue.substring(0, 8),
            serialNumber: cleanValue.substring(8, 14),
            checkDigit: cleanValue.substring(14, 15),
            marketName: deviceType === 'ios' ? 'iPhone' : 'Samsung Galaxy',
            modelNumber: cleanValue,
            manufacturer: deviceType === 'ios' ? 'Apple' : 'Samsung'
          }
        }
      };
    }

    if (identifierType === 'eid') {
      if (cleanValue.length !== 32) {
        console.log('EID inválido: comprimento incorreto');
        return { isValid: false };
      }

      if (!/^[0-9A-F]{32}$/i.test(cleanValue)) {
        console.log('EID inválido: formato hexadecimal incorreto');
        return { isValid: false };
      }
      
      if (!cleanValue.startsWith('89')) {
        console.log('EID inválido: prefixo incorreto');
        return { isValid: false };
      }

      // Lista de EIDs conhecidos para validação
      const knownValidEIDs = [
        '89033023525100100100035763232936'
      ];
      
      if (knownValidEIDs.includes(cleanValue.toUpperCase())) {
        console.log('EID válido encontrado na lista local:', cleanValue);
        return {
          isValid: true,
          deviceInfo: {
            brand: deviceType === 'ios' ? 'Apple' : 'Android',
            model: deviceType === 'ios' ? 'iPhone' : 'Smartphone'
          }
        };
      }

      // Simulação de validação para desenvolvimento
      return {
        isValid: true,
        deviceInfo: {
          brand: deviceType === 'ios' ? 'Apple' : 'Android',
          model: deviceType === 'ios' ? 'iPhone' : 'Smartphone'
        }
      };
    }

    console.log('Tipo de identificador inválido:', identifierType);
    return { isValid: false };
  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
