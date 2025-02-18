
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

export const isIOSIMEI = (tac: string): boolean => {
  // Verifica se o TAC está na lista de modelos iPhone
  return Object.keys(iphoneModels).some(key => tac.startsWith(key));
};

export const isAndroidIMEI = (tac: string): boolean => {
  // Verifica se o TAC está na lista de modelos Android ou começa com padrões conhecidos de Android
  if (Object.keys(androidModels).some(key => tac.startsWith(key))) {
    return true;
  }
  
  const tacPrefix = tac.substring(0, 3);
  return tacPrefix === '351' || tacPrefix === '352' || tacPrefix === '353' || tacPrefix === '354';
};

export const identifyDeviceBrand = (tac: string): string => {
  const tacPrefix = tac.substring(0, 3);
  
  if (tacPrefix === '351') {
    if (tac.startsWith('35118')) return 'Samsung';
    if (tac.startsWith('35120')) return 'Motorola';
    if (tac.startsWith('35122')) return 'Nokia';
  }
  
  return 'Android';
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  console.log('Verificando TAC:', tac, 'para dispositivo tipo:', deviceType);
  
  // Primeiro, verifica se o IMEI corresponde ao tipo de dispositivo selecionado
  if (deviceType === 'ios') {
    const isIos = isIOSIMEI(tac);
    console.log('É iOS?', isIos);
    if (!isIos) {
      throw new Error('IMEI_NOT_IOS');
    }
  }
  
  if (deviceType === 'android') {
    const isAndroid = isAndroidIMEI(tac);
    console.log('É Android?', isAndroid);
    if (!isAndroid) {
      throw new Error('IMEI_NOT_ANDROID');
    }
  }

  if (deviceType === 'ios') {
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

  const prefix = tac.substring(0, 8);
  console.log('Android TAC Prefix:', prefix);
  
  if (androidModels[prefix]) {
    console.log('Android model found:', androidModels[prefix]);
    return androidModels[prefix];
  }

  const brand = identifyDeviceBrand(tac);
  console.log('Generic Android Brand:', brand);
  
  return {
    brand,
    model: `${brand} Smartphone`,
    modelNumber: tac
  };
};
