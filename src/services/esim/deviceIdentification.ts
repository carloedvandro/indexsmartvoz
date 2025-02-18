
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

export const isIOSIMEI = (tac: string): boolean => {
  // Verifica os prefixos dos modelos iPhone
  const tacStart = tac.substring(0, 2);
  return tacStart === '35' && Object.keys(iphoneModels).some(key => tac.startsWith(key));
};

export const isAndroidIMEI = (tac: string): boolean => {
  // Verifica os prefixos dos modelos Android
  const tacStart = tac.substring(0, 2);
  return tacStart === '35' && Object.keys(androidModels).some(key => tac.startsWith(key));
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  console.log('Verificando TAC:', tac, 'para dispositivo tipo:', deviceType);
  
  // Validação específica por tipo de dispositivo
  if (deviceType === 'ios') {
    if (!isIOSIMEI(tac)) {
      console.log('IMEI não é de um dispositivo iOS');
      throw new Error('Este IMEI não pertence a um iPhone');
    }
    
    const prefix = tac.substring(0, 8);
    console.log('Procurando iPhone com TAC prefix:', prefix);
    
    const iPhoneModel = Object.entries(iphoneModels).find(([key]) => tac.startsWith(key));
    
    if (iPhoneModel) {
      const [_, modelInfo] = iPhoneModel;
      console.log('Modelo iPhone encontrado:', modelInfo);
      return {
        brand: 'Apple',
        model: modelInfo.model,
        modelNumber: modelInfo.modelNumber
      };
    }
    
    console.log('iPhone genérico');
    return { 
      brand: 'Apple', 
      model: 'iPhone',
      modelNumber: tac 
    };
  }

  // Validação para Android
  if (!isAndroidIMEI(tac)) {
    console.log('IMEI não é de um dispositivo Android');
    throw new Error('Este IMEI não pertence a um dispositivo Android');
  }

  const prefix = tac.substring(0, 8);
  console.log('Android TAC Prefix:', prefix);
  
  const androidModel = Object.entries(androidModels).find(([key]) => tac.startsWith(key));
  
  if (androidModel) {
    const [_, modelInfo] = androidModel;
    console.log('Android model found:', modelInfo);
    return modelInfo;
  }

  console.log('Android genérico');
  return {
    brand: 'Android',
    model: 'Android Smartphone',
    modelNumber: tac
  };
};
