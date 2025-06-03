
import { DeviceInfo } from './types/deviceTypes';
import { androidModels, iphoneModels } from './data/deviceModels';

export const identifyDeviceBrand = (tac: string): string => {
  console.log('Identificando marca do dispositivo com TAC:', tac);
  
  // Tentar identificar por prefixos mais específicos primeiro
  const tacPrefix8 = tac.substring(0, 8);
  const tacPrefix6 = tac.substring(0, 6);
  const tacPrefix4 = tac.substring(0, 4);
  const tacPrefix3 = tac.substring(0, 3);
  
  console.log('Prefixos TAC:', { tacPrefix8, tacPrefix6, tacPrefix4, tacPrefix3 });
  
  // Verificar se existe no banco de dados Android por prefixo
  if (androidModels[tacPrefix8]) {
    console.log('Encontrado por prefixo 8:', androidModels[tacPrefix8].brand);
    return androidModels[tacPrefix8].brand;
  }
  
  if (androidModels[tacPrefix6]) {
    console.log('Encontrado por prefixo 6:', androidModels[tacPrefix6].brand);
    return androidModels[tacPrefix6].brand;
  }
  
  // Lógica tradicional de identificação por prefixos conhecidos
  if (tacPrefix3 === '351') {
    if (tac.startsWith('35118')) return 'Samsung';
    if (tac.startsWith('35120')) return 'Motorola';
    if (tac.startsWith('35122')) return 'Nokia';
    if (tac.startsWith('35123')) return 'Xiaomi';
    if (tac.startsWith('35124')) return 'Realme';
    if (tac.startsWith('35125')) return 'Oppo';
    if (tac.startsWith('35126')) return 'Vivo';
    if (tac.startsWith('35127')) return 'OnePlus';
    if (tac.startsWith('35128') || tac.startsWith('35828')) return 'Apple';
  }
  
  // Verificar por outros prefixos conhecidos
  if (tacPrefix6 === '358008' || tacPrefix6 === '354389') return 'Samsung';
  if (tacPrefix6 === '358009' || tacPrefix6 === '356723') return 'Motorola';
  if (tacPrefix6 === '358011' || tacPrefix6 === '352094') return 'Nokia';
  if (tacPrefix6 === '358012' || tacPrefix6 === '862421') return 'Xiaomi';
  if (tacPrefix6 === '358403' || tacPrefix6 === '359229') return 'Apple';
  
  console.log('Usando identificação genérica: Android');
  return 'Android';
};

export const getDeviceInfo = (tac: string, deviceType: string): DeviceInfo => {
  console.log('Obtendo informações do dispositivo:', { tac, deviceType });
  
  if (deviceType === 'ios') {
    // Verificar com prefixos de diferentes tamanhos para iPhone
    const prefixes = [8, 7, 6, 5, 4].map(length => tac.substring(0, length));
    console.log('Prefixos iPhone a verificar:', prefixes);
    
    for (const prefix of prefixes) {
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
    }
    
    console.log('iPhone genérico - sem modelo específico encontrado');
    return { 
      brand: 'Apple', 
      model: 'iPhone',
      modelNumber: tac 
    };
  }

  // Lógica para Android com múltiplos níveis de busca
  const searchPrefixes = [8, 7, 6, 5, 4].map(length => tac.substring(0, length));
  console.log('Prefixos Android a verificar:', searchPrefixes);
  
  for (const prefix of searchPrefixes) {
    if (androidModels[prefix]) {
      console.log('Android model encontrado:', androidModels[prefix]);
      return androidModels[prefix];
    }
  }

  // Se não encontrou modelo específico, usar identificação de marca
  const brand = identifyDeviceBrand(tac);
  console.log('Usando marca genérica:', brand);
  
  return {
    brand,
    model: `${brand} Smartphone`,
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
