
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
    const prefix = tac.substring(0, 8);
    console.log('iOS TAC Prefix:', prefix);
    
    if (iphoneModels[prefix]) {
      console.log('iPhone model found:', iphoneModels[prefix]);
      return {
        brand: 'Apple',
        model: iphoneModels[prefix].model,
        modelNumber: iphoneModels[prefix].modelNumber
      };
    }
    
    console.log('Generic iPhone');
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
