
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

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
  if (deviceType === 'ios') {
    // Pegando os primeiros 8 dígitos do TAC para iPhone
    const prefix = tac.substring(0, 8);
    console.log('Procurando iPhone com TAC prefix:', prefix);
    
    // Verificando se existe um modelo de iPhone com esse TAC
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

  // Lógica para Android
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
