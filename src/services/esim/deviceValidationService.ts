
import { supabase } from "@/integrations/supabase/client";
import { DeviceValidationResult, DeviceValidationResponse } from './types/deviceTypes';
import { validateImeiChecksum, parseImei } from './utils/imeiUtils';
import { getDeviceInfo } from './deviceIdentification';

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

      const { tac, serialNumber, checkDigit } = parseImei(cleanValue);
      console.log('TAC completo:', tac);
      console.log('Device Type:', deviceType);
      
      const deviceDetails = getDeviceInfo(tac, deviceType);
      console.log('Device Details:', deviceDetails);

      // Construir as especificações detalhadas do dispositivo
      const specs = {
        tac: tac,
        serialNumber: serialNumber,
        checkDigit: checkDigit,
        marketName: deviceDetails.model,
        modelNumber: deviceDetails.modelNumber,
        manufacturer: deviceDetails.brand
      };

      return {
        isValid: true,
        deviceInfo: {
          brand: deviceDetails.brand,
          model: deviceDetails.model,
          specs: specs
        }
      };
    }

    if (identifierType === 'eid') {
      // Verificações mais rigorosas para EID
      if (cleanValue.length !== 32) {
        console.log('EID inválido: comprimento incorreto');
        return { isValid: false };
      }

      // Verificar formato hexadecimal válido
      if (!cleanValue.match(/^[0-9A-F]{32}$/i)) {
        console.log('EID inválido: formato incorreto');
        return { isValid: false };
      }

      // Lista local de EIDs conhecidos para validação
      // Em produção, esta lista seria expandida ou substituída por verificação em API/DB
      const knownValidEIDs = [
        '89033023525100100100035763232936'
      ];
      
      if (knownValidEIDs.includes(cleanValue)) {
        console.log('EID válido encontrado na lista local');
        return {
          isValid: true,
          deviceInfo: {
            brand: deviceType === 'ios' ? 'Apple' : 'Android',
            model: deviceType === 'ios' ? 'iPhone' : 'Smartphone'
          }
        };
      }

      // Verificação adicional com o banco de dados
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
      
      // Verificação adicional do resultado
      if (!result.is_valid) {
        console.log('EID inválido pela validação do banco');
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
    }

    return { isValid: false };
  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
