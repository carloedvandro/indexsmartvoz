
// TAC to brand mapping utility
export const brandMappings: { [key: string]: string } = {
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

export const getModelLineByBrand = (brand: string, tacStr: string): string => {
  switch (brand) {
    case 'Samsung':
      if (tacStr.includes('800') || tacStr.includes('801') || tacStr.includes('802')) {
        return 'Galaxy S Series';
      } else if (tacStr.includes('803') || tacStr.includes('804')) {
        return 'Galaxy A Series';
      } else if (tacStr.includes('805') || tacStr.includes('806')) {
        return 'Galaxy Z Series';
      } else {
        return 'Galaxy Smartphone';
      }
    
    case 'Xiaomi':
      if (tacStr.includes('201') || tacStr.includes('202')) {
        return 'Xiaomi Series';
      } else if (tacStr.includes('210') || tacStr.includes('211')) {
        return 'Redmi Series';
      } else if (tacStr.includes('214') || tacStr.includes('215')) {
        return 'POCO Series';
      } else {
        return 'Xiaomi Smartphone';
      }
    
    case 'OnePlus':
      if (tacStr.includes('601') || tacStr.includes('602')) {
        return 'OnePlus Series';
      } else if (tacStr.includes('603') || tacStr.includes('604')) {
        return 'OnePlus Nord Series';
      } else {
        return 'OnePlus Smartphone';
      }
    
    case 'Google':
      return 'Pixel Smartphone';
    
    case 'Motorola':
      if (tacStr.includes('991') || tacStr.includes('992')) {
        return 'Edge Series';
      } else if (tacStr.includes('998') || tacStr.includes('999')) {
        return 'Moto G Series';
      } else {
        return 'Moto Smartphone';
      }
    
    default:
      return 'Smartphone';
  }
};
