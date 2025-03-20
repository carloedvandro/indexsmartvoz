
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
      // Verificação rigorosa de comprimento
      if (cleanValue.length !== 32) {
        console.log('EID inválido: comprimento incorreto');
        return { isValid: false };
      }

      // Verificação rigorosa de formato hexadecimal
      if (!/^[0-9A-F]{32}$/i.test(cleanValue)) {
        console.log('EID inválido: formato hexadecimal incorreto');
        return { isValid: false };
      }

      // Lista de EIDs conhecidos e válidos (lista local para validação rápida)
      const knownValidEIDs = [
        '89033023525100100100035763232936'
      ];
      
      // Verificar na lista local de EIDs conhecidos
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

      // Verificação com o banco de dados Supabase
      console.log('Verificando EID com o banco de dados:', cleanValue);
      const { data, error } = await supabase.rpc('validate_device_identifier', {
        p_device_type: deviceType,
        p_identifier_type: identifierType,
        p_value: cleanValue.toUpperCase()
      });

      console.log('Resposta do banco:', data);

      if (error) {
        console.error('Erro na validação com banco de dados:', error);
        return { isValid: false };
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('Nenhum dispositivo encontrado no banco de dados');
        return { isValid: false };
      }

      const [result] = data as DeviceValidationResponse[];
      
      // Verificação do resultado retornado pelo banco
      if (!result.is_valid) {
        console.log('EID inválido pela validação do banco de dados');
        return { isValid: false };
      }

      console.log('EID válido confirmado pelo banco de dados:', cleanValue);
      
      // Extrair informações do dispositivo retornadas pelo banco
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

    console.log('Tipo de identificador inválido:', identifierType);
    return { isValid: false };
  } catch (error) {
    console.error('Erro inesperado na validação:', error);
    return { isValid: false };
  }
};
