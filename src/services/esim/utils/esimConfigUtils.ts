
import { DeviceInfo } from '../types/deviceTypes';

// eSIM configuration utilities

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
  console.log('Dispositivo Android - assumindo suporte eSIM');
  return true;
};

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
