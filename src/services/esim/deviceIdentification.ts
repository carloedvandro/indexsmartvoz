
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

export const isIOSIMEI = (tac: string): boolean => {
  // Verifica se o TAC começa com padrões conhecidos de iPhone
  const iosPrefixes = ['35372', '35728', '35851', '35853'];
  return iosPrefixes.some(prefix => tac.startsWith(prefix));
};

export const isAndroidIMEI = (tac: string): boolean => {
  // Verifica se o TAC começa com padrões conhecidos de Android
  const androidPrefixes = ['35137', '35580', '35582', '35235', '35236'];
  return androidPrefixes.some(prefix => tac.startsWith(prefix));
};

export const identifyDeviceBrand = (tac: string): string => {
  if (tac.startsWith('35137') || tac.startsWith('35580')) return 'Samsung';
  if (tac.startsWith('35235') || tac.startsWith('35236')) return 'Motorola';
  if (tac.startsWith('35882')) return 'Google';
  return 'Android';
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  // Primeiro, verifica se o IMEI corresponde ao tipo de dispositivo selecionado
  if (deviceType === 'ios' && !isIOSIMEI(tac)) {
    throw new Error('IMEI_NOT_IOS');
  }
  
  if (deviceType === 'android' && !isAndroidIMEI(tac)) {
    throw new Error('IMEI_NOT_ANDROID');
  }

  if (deviceType === 'ios') {
    const prefix = tac.substring(0, 6);
    console.log('Procurando iPhone com TAC prefix:', prefix);
    
    // Verifica os modelos de iPhone mais recentes primeiro
    const iPhoneModel = Object.entries(iphoneModels).find(([key]) => 
      tac.startsWith(key) || prefix.startsWith(key.substring(0, 6))
    );
    
    if (iPhoneModel) {
      const [_, modelInfo] = iPhoneModel;
      console.log('Modelo iPhone encontrado:', modelInfo);
      return {
        brand: 'Apple',
        model: modelInfo.model,
        modelNumber: modelInfo.modelNumber
      };
    }
    
    // Se não encontrou um modelo específico mas é um TAC de iPhone válido
    return { 
      brand: 'Apple', 
      model: 'iPhone',
      modelNumber: `A${tac.substring(0, 4)}` 
    };
  }

  // Lógica para Android
  const prefix = tac.substring(0, 6);
  console.log('Android TAC Prefix:', prefix);
  
  // Verifica os modelos Android conhecidos
  const androidModel = Object.entries(androidModels).find(([key]) => 
    tac.startsWith(key) || prefix.startsWith(key.substring(0, 6))
  );
  
  if (androidModel) {
    const [_, modelInfo] = androidModel;
    console.log('Android model found:', modelInfo);
    return modelInfo;
  }

  // Se não encontrou um modelo específico, identifica pelo menos a marca
  const brand = identifyDeviceBrand(tac);
  console.log('Generic Android Brand:', brand);
  
  return {
    brand,
    model: `${brand} Smartphone`,
    modelNumber: `SM-${tac.substring(0, 4)}`
  };
};
