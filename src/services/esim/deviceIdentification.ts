
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

export const identifyDeviceBrand = (tac: string): string => {
  // Verificando se é um iPhone conhecido
  if (Object.keys(iphoneModels).some(key => tac.startsWith(key))) {
    return 'Apple';
  }
  
  // Verificando se é um Android conhecido
  if (Object.keys(androidModels).some(key => tac.startsWith(key))) {
    return 'Android';
  }
  
  // Verificando prefixos específicos de fabricantes Android
  const tacPrefix = tac.substring(0, 5);
  if (tacPrefix === '35118') return 'Samsung';
  if (tacPrefix === '35120') return 'Motorola';
  if (tacPrefix === '35122') return 'Nokia';
  
  return 'Unknown';
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  const brand = identifyDeviceBrand(tac);
  console.log('Identified brand:', brand);

  if (deviceType === 'ios') {
    // Validação específica para iOS
    if (brand !== 'Apple') {
      console.log('IMEI não pertence a um iPhone');
      throw new Error('Este IMEI não corresponde a um iPhone');
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

  // Validação específica para Android
  if (brand === 'Apple') {
    console.log('IMEI pertence a um iPhone, não a um Android');
    throw new Error('Este IMEI pertence a um iPhone, não a um dispositivo Android');
  }
  
  if (brand === 'Unknown') {
    console.log('IMEI não reconhecido como Android válido');
    throw new Error('IMEI não reconhecido como um dispositivo Android válido');
  }

  const prefix = tac.substring(0, 8);
  console.log('Android TAC Prefix:', prefix);
  
  if (androidModels[prefix]) {
    console.log('Android model found:', androidModels[prefix]);
    return androidModels[prefix];
  }

  console.log('Generic Android Brand:', brand);
  return {
    brand,
    model: `${brand} Smartphone`,
    modelNumber: tac
  };
};
