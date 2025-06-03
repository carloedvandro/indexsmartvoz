
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';
import { brandMappings, getModelLineByBrand } from './utils/brandMappings';
import { identifyBrandByTacPatterns, generateTacPrefixes } from './utils/tacPatternUtils';
import { identifyIPhoneModel } from './utils/iphoneUtils';

export const identifyDeviceBrand = (tac: string): string => {
  console.log('Identificando marca do dispositivo com TAC:', tac);
  
  // Tentar identificar por prefixos de diferentes tamanhos para melhor cobertura
  const tacPrefixes = generateTacPrefixes(tac);
  
  console.log('Prefixos TAC para verificação:', tacPrefixes);
  
  // Verificar no banco de dados Android por ordem de especificidade
  for (const prefix of tacPrefixes) {
    if (androidModels[prefix]) {
      console.log(`Encontrado por prefixo ${prefix.length}:`, androidModels[prefix].brand);
      return androidModels[prefix].brand;
    }
  }
  
  // Identificação por padrões específicos de marca baseado em TAC
  const tacPrefix6 = tac.substring(0, 6);
  
  // Verificar mapeamentos específicos por TAC completo (6 dígitos)
  if (brandMappings[tacPrefix6]) {
    console.log('Marca identificada por TAC específico:', brandMappings[tacPrefix6]);
    return brandMappings[tacPrefix6];
  }
  
  // Usar identificação por padrões de TAC
  const brandByPattern = identifyBrandByTacPatterns(tac);
  if (brandByPattern !== 'Android') {
    return brandByPattern;
  }
  
  console.log('Usando identificação genérica: Android');
  return 'Android';
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  console.log('Obtendo informações do dispositivo:', { tac, deviceType });
  
  if (deviceType === 'ios') {
    // Verificar com prefixos de diferentes tamanhos para iPhone
    const prefixes = generateTacPrefixes(tac);
    console.log('Prefixos iPhone a verificar:', prefixes);
    
    // Busca por correspondência exata primeiro
    for (const prefix of prefixes) {
      if (iphoneModels[prefix]) {
        const modelInfo = iphoneModels[prefix];
        console.log('Modelo iPhone encontrado:', modelInfo);
        return {
          brand: 'Apple',
          model: modelInfo.model,
          modelNumber: modelInfo.modelNumber
        };
      }
    }
    
    // Se não encontrou modelo específico, tentar identificar por padrões conhecidos do iPhone
    const iphoneInfo = identifyIPhoneModel(tac);
    console.log('iPhone genérico identificado:', iphoneInfo);
    return { 
      brand: 'Apple', 
      model: iphoneInfo.model,
      modelNumber: iphoneInfo.modelNumber
    };
  }

  // Lógica para Android com múltiplos níveis de busca
  const searchPrefixes = generateTacPrefixes(tac);
  console.log('Prefixos Android a verificar:', searchPrefixes);
  
  // Busca por correspondência exata
  for (const prefix of searchPrefixes) {
    if (androidModels[prefix]) {
      console.log('Android model encontrado:', androidModels[prefix]);
      return androidModels[prefix];
    }
  }

  // Se não encontrou modelo específico, usar identificação de marca
  const brand = identifyDeviceBrand(tac);
  console.log('Usando marca genérica:', brand);
  
  // Tentar identificar linha de produtos baseado no TAC
  const modelLine = getModelLineByBrand(brand, tac.toString());
  
  return {
    brand,
    model: `${brand} ${modelLine}`,
    modelNumber: tac
  };
};

// Re-export utilities for backward compatibility
export { supportsESIM, getDeviceESIMConfig } from './utils/esimConfigUtils';
