import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

export const identifyDeviceBrand = (tac: string): string => {
  console.log('Identificando marca do dispositivo com TAC:', tac);
  
  // Tentar identificar por prefixos de diferentes tamanhos para melhor cobertura
  const tacPrefixes = [
    tac.substring(0, 8),
    tac.substring(0, 7),
    tac.substring(0, 6),
    tac.substring(0, 5),
    tac.substring(0, 4),
    tac.substring(0, 3)
  ];
  
  console.log('Prefixos TAC para verificação:', tacPrefixes);
  
  // Verificar no banco de dados Android por ordem de especificidade
  for (const prefix of tacPrefixes) {
    if (androidModels[prefix]) {
      console.log(`Encontrado por prefixo ${prefix.length}:`, androidModels[prefix].brand);
      return androidModels[prefix].brand;
    }
  }
  
  // Identificação por padrões específicos de marca baseado em TAC
  const tacPrefix3 = tac.substring(0, 3);
  const tacPrefix6 = tac.substring(0, 6);
  
  // Mapeamento avançado de TAC para marcas (removidas duplicatas)
  const brandMappings: { [key: string]: string } = {
    // Samsung
    '358008': 'Samsung',
    '354389': 'Samsung',
    '356398': 'Samsung',
    '352387': 'Samsung',
    
    // Apple - usando prefixos únicos
    '358403': 'Apple',
    '359229': 'Apple',
    '355608': 'Apple',
    '352094': 'Apple',
    
    // Motorola
    '358009': 'Motorola',
    '356723': 'Motorola',
    '352741': 'Motorola',
    '357834': 'Motorola',
    
    // Xiaomi/Redmi/POCO
    '862421': 'Xiaomi',
    '863104': 'Xiaomi',
    '867994': 'Xiaomi',
    '869404': 'Xiaomi',
    
    // OnePlus - usando prefixos únicos
    '869847': 'OnePlus',
    '864523': 'OnePlus',
    
    // Google Pixel - usando prefixos únicos
    '357307': 'Google',
    
    // Huawei - usando prefixos únicos
    '864934': 'Huawei',
    '867425': 'Huawei',
    
    // Honor
    '869234': 'Honor',
    
    // Vivo
    '868912': 'Vivo',
    '862742': 'Vivo',
    
    // Oppo
    '860425': 'Oppo',
    '863751': 'Oppo',
    
    // Realme
    '866971': 'Realme',
    '862984': 'Realme',
    
    // Nokia
    '357425': 'Nokia',
    '354892': 'Nokia',
    
    // Sony
    '352847': 'Sony',
    '358741': 'Sony',
    
    // Nothing
    '869235': 'Nothing',
    
    // Asus
    '355234': 'Asus',
    '867234': 'Asus',
  };
  
  // Verificar mapeamentos específicos por TAC completo (6 dígitos)
  if (brandMappings[tacPrefix6]) {
    console.log('Marca identificada por TAC específico:', brandMappings[tacPrefix6]);
    return brandMappings[tacPrefix6];
  }
  
  // Identificação por padrões genéricos de prefixo
  if (tacPrefix3 === '351' || tacPrefix3 === '352' || tacPrefix3 === '353') {
    // Análise mais detalhada para prefixos 35x
    if (tac.startsWith('35118') || tac.startsWith('35438')) return 'Samsung';
    if (tac.startsWith('35120') || tac.startsWith('35672')) return 'Motorola';
    if (tac.startsWith('35122') || tac.startsWith('35209')) return 'Nokia';
    if (tac.startsWith('35123') || tac.startsWith('86242')) return 'Xiaomi';
    if (tac.startsWith('35124') || tac.startsWith('86297')) return 'Realme';
    if (tac.startsWith('35125') || tac.startsWith('86042')) return 'Oppo';
    if (tac.startsWith('35126') || tac.startsWith('86891')) return 'Vivo';
    if (tac.startsWith('35127') || tac.startsWith('86799')) return 'OnePlus';
    if (tac.startsWith('35128') || tac.startsWith('35840') || tac.startsWith('35922')) return 'Apple';
    if (tac.startsWith('35129') || tac.startsWith('35560')) return 'Google';
    if (tac.startsWith('35130') || tac.startsWith('86940')) return 'Huawei';
    if (tac.startsWith('35131') || tac.startsWith('86493')) return 'Honor';
  }
  
  // Identificação para prefixos 86x (comum em dispositivos asiáticos)
  if (tacPrefix3 === '860' || tacPrefix3 === '861' || tacPrefix3 === '862' || 
      tacPrefix3 === '863' || tacPrefix3 === '864' || tacPrefix3 === '865' ||
      tacPrefix3 === '866' || tacPrefix3 === '867' || tacPrefix3 === '868' || tacPrefix3 === '869') {
    
    if (tac.startsWith('86242') || tac.startsWith('86310')) return 'Xiaomi';
    if (tac.startsWith('86799') || tac.startsWith('86452')) return 'OnePlus';
    if (tac.startsWith('86940') || tac.startsWith('86742')) return 'Huawei';
    if (tac.startsWith('86493') || tac.startsWith('86984')) return 'Honor';
    if (tac.startsWith('86891') || tac.startsWith('86274')) return 'Vivo';
    if (tac.startsWith('86042') || tac.startsWith('86375')) return 'Oppo';
    if (tac.startsWith('86697') || tac.startsWith('86298')) return 'Realme';
    if (tac.startsWith('86923')) return 'Nothing';
  }
  
  console.log('Usando identificação genérica: Android');
  return 'Android';
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  console.log('Obtendo informações do dispositivo:', { tac, deviceType });
  
  if (deviceType === 'ios') {
    // Verificar com prefixos de diferentes tamanhos para iPhone
    const prefixes = [8, 7, 6, 5, 4, 3].map(length => tac.substring(0, length));
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
    const tacStr = tac.toString();
    if (tacStr.startsWith('353281') || tacStr.startsWith('358403') || 
        tacStr.startsWith('359229') || tacStr.startsWith('357307') ||
        tacStr.startsWith('355608') || tacStr.startsWith('352094')) {
      
      // Tentar identificar geração do iPhone baseado em padrões do TAC
      if (tacStr.includes('323') || tacStr.includes('324')) {
        return { brand: 'Apple', model: 'iPhone 15 Series', modelNumber: tac };
      } else if (tacStr.includes('321') || tacStr.includes('322')) {
        return { brand: 'Apple', model: 'iPhone 14 Series', modelNumber: tac };
      } else if (tacStr.includes('319') || tacStr.includes('320')) {
        return { brand: 'Apple', model: 'iPhone 13 Series', modelNumber: tac };
      } else if (tacStr.includes('317') || tacStr.includes('318')) {
        return { brand: 'Apple', model: 'iPhone 12 Series', modelNumber: tac };
      } else if (tacStr.includes('315') || tacStr.includes('316')) {
        return { brand: 'Apple', model: 'iPhone 11 Series', modelNumber: tac };
      }
    }
    
    console.log('iPhone genérico - sem modelo específico encontrado');
    return { 
      brand: 'Apple', 
      model: 'iPhone',
      modelNumber: tac 
    };
  }

  // Lógica para Android com múltiplos níveis de busca
  const searchPrefixes = [8, 7, 6, 5, 4, 3].map(length => tac.substring(0, length));
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
  let modelLine = 'Smartphone';
  const tacStr = tac.toString();
  
  if (brand === 'Samsung') {
    if (tacStr.includes('800') || tacStr.includes('801') || tacStr.includes('802')) {
      modelLine = 'Galaxy S Series';
    } else if (tacStr.includes('803') || tacStr.includes('804')) {
      modelLine = 'Galaxy A Series';
    } else if (tacStr.includes('805') || tacStr.includes('806')) {
      modelLine = 'Galaxy Z Series';
    } else {
      modelLine = 'Galaxy Smartphone';
    }
  } else if (brand === 'Xiaomi') {
    if (tacStr.includes('201') || tacStr.includes('202')) {
      modelLine = 'Xiaomi Series';
    } else if (tacStr.includes('210') || tacStr.includes('211')) {
      modelLine = 'Redmi Series';
    } else if (tacStr.includes('214') || tacStr.includes('215')) {
      modelLine = 'POCO Series';
    } else {
      modelLine = 'Xiaomi Smartphone';
    }
  } else if (brand === 'OnePlus') {
    if (tacStr.includes('601') || tacStr.includes('602')) {
      modelLine = 'OnePlus Series';
    } else if (tacStr.includes('603') || tacStr.includes('604')) {
      modelLine = 'OnePlus Nord Series';
    } else {
      modelLine = 'OnePlus Smartphone';
    }
  } else if (brand === 'Google') {
    modelLine = 'Pixel Smartphone';
  } else if (brand === 'Motorola') {
    if (tacStr.includes('991') || tacStr.includes('992')) {
      modelLine = 'Edge Series';
    } else if (tacStr.includes('998') || tacStr.includes('999')) {
      modelLine = 'Moto G Series';
    } else {
      modelLine = 'Moto Smartphone';
    }
  }
  
  return {
    brand,
    model: `${brand} ${modelLine}`,
    modelNumber: tac
  };
};

// Função para verificar se o dispositivo suporta eSIM
export const supportsESIM = (deviceInfo: DeviceInfo): boolean => {
  console.log('Verificando suporte eSIM para:', deviceInfo);
  
  // Lista de modelos que NÃO suportam eSIM
  const nonESIMModels = [
    'iPhone 8', 'iPhone 8 Plus', 'iPhone 7', 'iPhone 7 Plus', 
    'iPhone 6s', 'iPhone 6s Plus', 'iPhone 6', 'iPhone 6 Plus',
    'iPhone SE (1st generation)', 'iPhone 5s', 'iPhone 5c', 'iPhone 5'
  ];
  
  // Se é iPhone, verificar se não está na lista de exclusão
  if (deviceInfo.brand === 'Apple') {
    const isOldModel = nonESIMModels.some(oldModel => 
      deviceInfo.model.toLowerCase().includes(oldModel.toLowerCase())
    );
    
    if (isOldModel) {
      console.log('iPhone antigo sem suporte eSIM:', deviceInfo.model);
      return false;
    }
    
    // iPhones a partir do XS suportam eSIM
    console.log('iPhone com suporte eSIM');
    return true;
  }
  
  // Para Android, a maioria dos dispositivos modernos suporta eSIM
  // Pode-se adicionar lógica específica aqui se necessário
  console.log('Dispositivo Android - assumindo suporte eSIM');
  return true;
};

// Função para obter configurações específicas do dispositivo
export const getDeviceESIMConfig = (deviceInfo: DeviceInfo): any => {
  console.log('Obtendo configurações eSIM para:', deviceInfo);
  
  if (deviceInfo.brand === 'Apple') {
    return {
      activationMethod: 'qr_code',
      requiresCarrierActivation: true,
      supportsDualSIM: true,
      configSteps: [
        'Acesse Configurações > Celular',
        'Toque em "Adicionar Plano Celular"',
        'Escaneie o código QR fornecido',
        'Siga as instruções na tela'
      ]
    };
  }
  
  // Configurações para Samsung
  if (deviceInfo.brand === 'Samsung') {
    return {
      activationMethod: 'qr_code',
      requiresCarrierActivation: true,
      supportsDualSIM: true,
      configSteps: [
        'Acesse Configurações > Conexões > Gerenciador de cartão SIM',
        'Toque em "Adicionar plano móvel"',
        'Escaneie o código QR fornecido',
        'Configure o plano conforme necessário'
      ]
    };
  }
  
  // Configurações genéricas para outros Android
  return {
    activationMethod: 'qr_code',
    requiresCarrierActivation: true,
    supportsDualSIM: true,
    configSteps: [
      'Acesse Configurações do dispositivo',
      'Procure por "SIM" ou "Rede móvel"',
      'Encontre opção "Adicionar eSIM" ou "Adicionar plano"',
      'Escaneie o código QR fornecido',
      'Complete a configuração seguindo as instruções'
    ]
  };
};
