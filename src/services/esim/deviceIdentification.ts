
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
    if (iphoneModels[prefix]) {
      return {
        brand: 'Apple',
        model: iphoneModels[prefix].model,
        modelNumber: iphoneModels[prefix].modelNumber
      };
    }
    return { brand: 'Apple', model: 'iPhone', modelNumber: tac };
  }

  const prefix = tac.substring(0, 8);
  console.log('TAC Prefix:', prefix);
  console.log('Device Type:', deviceType);
  
  if (androidModels[prefix]) {
    console.log('Modelo encontrado:', androidModels[prefix]);
    return androidModels[prefix];
  }

  const brand = identifyDeviceBrand(tac);
  console.log('Brand:', brand);
  
  return {
    brand,
    model: `${brand} Smartphone`,
    modelNumber: tac
  };
};
