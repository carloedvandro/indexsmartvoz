
export const iphoneModels: { [key: string]: { model: string; modelNumber: string } } = {
  // iPhone 15 Series
  '35328130': { model: 'iPhone 15 Pro Max', modelNumber: 'A3108' },
  '35328131': { model: 'iPhone 15 Pro', modelNumber: 'A3107' },
  '35328132': { model: 'iPhone 15 Plus', modelNumber: 'A3093' },
  '35328133': { model: 'iPhone 15', modelNumber: 'A3092' },
  
  // iPhone 14 Series
  '35328115': { model: 'iPhone 14 Pro Max', modelNumber: 'A2650' },
  '35328116': { model: 'iPhone 14 Pro', modelNumber: 'A2649' },
  '35328117': { model: 'iPhone 14 Plus', modelNumber: 'A2632' },
  '35328118': { model: 'iPhone 14', modelNumber: 'A2631' },
  
  // iPhone 13 Series
  '35328119': { model: 'iPhone 13 Pro Max', modelNumber: 'A2484' },
  '35328120': { model: 'iPhone 13 Pro', modelNumber: 'A2483' },
  '35328121': { model: 'iPhone 13', modelNumber: 'A2482' },
  '35328122': { model: 'iPhone 13 Mini', modelNumber: 'A2481' },
  
  // iPhone 12 Series
  '35328123': { model: 'iPhone 12 Pro Max', modelNumber: 'A2342' },
  '35328124': { model: 'iPhone 12 Pro', modelNumber: 'A2341' },
  '35328125': { model: 'iPhone 12', modelNumber: 'A2172' },
  '35328126': { model: 'iPhone 12 Mini', modelNumber: 'A2176' },
  
  // iPhone 11 Series
  '35328127': { model: 'iPhone 11 Pro Max', modelNumber: 'A2161' },
  '35328128': { model: 'iPhone 11 Pro', modelNumber: 'A2160' },
  '35328129': { model: 'iPhone 11', modelNumber: 'A2111' },
  
  // iPhone XS Series
  '35328140': { model: 'iPhone XS Max', modelNumber: 'A1921' },
  '35328141': { model: 'iPhone XS', modelNumber: 'A1920' },
  '35328142': { model: 'iPhone XR', modelNumber: 'A1984' },
  
  // iPhone X
  '35328143': { model: 'iPhone X', modelNumber: 'A1865' },
  
  // Padrões genéricos por prefixos mais amplos
  '353281': { model: 'iPhone', modelNumber: 'Generic' },
  '358403': { model: 'iPhone', modelNumber: 'Generic' },
  '359229': { model: 'iPhone', modelNumber: 'Generic' },
  '357307': { model: 'iPhone', modelNumber: 'Generic' },
};

export const androidModels: { [key: string]: { brand: string; model: string; modelNumber: string } } = {
  // Samsung Galaxy S Series
  '35800881': { brand: 'Samsung', model: 'Galaxy S23 Ultra', modelNumber: 'SM-S918B' },
  '35800882': { brand: 'Samsung', model: 'Galaxy S23+', modelNumber: 'SM-S916B' },
  '35800883': { brand: 'Samsung', model: 'Galaxy S23', modelNumber: 'SM-S911B' },
  '35800884': { brand: 'Samsung', model: 'Galaxy S22 Ultra', modelNumber: 'SM-S908B' },
  '35800885': { brand: 'Samsung', model: 'Galaxy S22+', modelNumber: 'SM-S906B' },
  '35800886': { brand: 'Samsung', model: 'Galaxy S22', modelNumber: 'SM-S901B' },
  '35800887': { brand: 'Samsung', model: 'Galaxy Z Fold 5', modelNumber: 'SM-F946B' },
  '35800888': { brand: 'Samsung', model: 'Galaxy Z Flip 5', modelNumber: 'SM-F731B' },
  '35800889': { brand: 'Samsung', model: 'Galaxy S21 Ultra', modelNumber: 'SM-G998B' },
  '35800890': { brand: 'Samsung', model: 'Galaxy S21+', modelNumber: 'SM-G996B' },
  '35800891': { brand: 'Samsung', model: 'Galaxy S21', modelNumber: 'SM-G991B' },
  '35800892': { brand: 'Samsung', model: 'Galaxy Note 20 Ultra', modelNumber: 'SM-N986B' },
  '35800893': { brand: 'Samsung', model: 'Galaxy Note 20', modelNumber: 'SM-N981B' },
  
  // Samsung Galaxy A Series
  '35800894': { brand: 'Samsung', model: 'Galaxy A54 5G', modelNumber: 'SM-A546B' },
  '35800895': { brand: 'Samsung', model: 'Galaxy A34 5G', modelNumber: 'SM-A346B' },
  '35800896': { brand: 'Samsung', model: 'Galaxy A14 5G', modelNumber: 'SM-A146B' },
  '35800897': { brand: 'Samsung', model: 'Galaxy A73 5G', modelNumber: 'SM-A736B' },
  '35800898': { brand: 'Samsung', model: 'Galaxy A53 5G', modelNumber: 'SM-A536B' },

  // Motorola Edge Series
  '35800991': { brand: 'Motorola', model: 'Edge 40 Pro', modelNumber: 'XT2301-4' },
  '35800992': { brand: 'Motorola', model: 'Edge 40', modelNumber: 'XT2303-1' },
  '35800993': { brand: 'Motorola', model: 'Edge 30 Ultra', modelNumber: 'XT2241-1' },
  '35800994': { brand: 'Motorola', model: 'Edge 30 Pro', modelNumber: 'XT2201-1' },
  '35800995': { brand: 'Motorola', model: 'Moto G73 5G', modelNumber: 'XT2245-1' },
  '35800996': { brand: 'Motorola', model: 'Moto G53 5G', modelNumber: 'XT2335-1' },
  '35800997': { brand: 'Motorola', model: 'Moto G23', modelNumber: 'XT2343-1' },

  // Xiaomi Models
  '35801201': { brand: 'Xiaomi', model: 'Redmi Note 12 Pro', modelNumber: '2210132G' },
  '35801202': { brand: 'Xiaomi', model: 'Redmi Note 12', modelNumber: '2210129G' },
  '35801203': { brand: 'Xiaomi', model: 'POCO X5 Pro', modelNumber: '2211133G' },
  '35801204': { brand: 'Xiaomi', model: 'Mi 13', modelNumber: '2211133C' },
  '35801205': { brand: 'Xiaomi', model: 'Mi 12', modelNumber: '2201123G' },
  '35801206': { brand: 'Xiaomi', model: 'Redmi 12C', modelNumber: '22120RN86G' },
  '35801207': { brand: 'Xiaomi', model: 'Redmi A2', modelNumber: '220733SG' },

  // Nokia Models
  '35801101': { brand: 'Nokia', model: 'X30 5G', modelNumber: 'TA-1460' },
  '35801102': { brand: 'Nokia', model: 'G60 5G', modelNumber: 'TA-1447' },
  '35801103': { brand: 'Nokia', model: 'XR20', modelNumber: 'TA-1362' },
  '35801104': { brand: 'Nokia', model: 'G21', modelNumber: 'TA-1418' },
  '35801105': { brand: 'Nokia', model: 'C21 Plus', modelNumber: 'TA-1453' },

  // Realme Models
  '35801301': { brand: 'Realme', model: 'GT 3', modelNumber: 'RMX3708' },
  '35801302': { brand: 'Realme', model: '11 Pro+', modelNumber: 'RMX3741' },
  '35801303': { brand: 'Realme', model: '11 Pro', modelNumber: 'RMX3740' },
  '35801304': { brand: 'Realme', model: 'C55', modelNumber: 'RMX3710' },
  '35801305': { brand: 'Realme', model: 'C33', modelNumber: 'RMX3624' },

  // Oppo Models
  '35801401': { brand: 'Oppo', model: 'Find X6 Pro', modelNumber: 'PHB110' },
  '35801402': { brand: 'Oppo', model: 'Reno 10 Pro', modelNumber: 'CPH2541' },
  '35801403': { brand: 'Oppo', model: 'A98 5G', modelNumber: 'CPH2481' },
  '35801404': { brand: 'Oppo', model: 'A78 5G', modelNumber: 'CPH2483' },

  // Vivo Models
  '35801501': { brand: 'Vivo', model: 'X90 Pro', modelNumber: 'V2242A' },
  '35801502': { brand: 'Vivo', model: 'Y35', modelNumber: 'V2204' },
  '35801503': { brand: 'Vivo', model: 'Y16', modelNumber: 'V2204' },

  // OnePlus Models
  '35801601': { brand: 'OnePlus', model: '11 5G', modelNumber: 'CPH2449' },
  '35801602': { brand: 'OnePlus', model: 'Nord CE 3 Lite', modelNumber: 'CPH2467' },
  '35801603': { brand: 'OnePlus', model: 'Nord N30 5G', modelNumber: 'CPH2513' },

  // Google Pixel Models
  '35801701': { brand: 'Google', model: 'Pixel 7 Pro', modelNumber: 'GVU6C' },
  '35801702': { brand: 'Google', model: 'Pixel 7', modelNumber: 'GVU6C' },
  '35801703': { brand: 'Google', model: 'Pixel 6a', modelNumber: 'GB62Z' },

  // LG Models (older but still in use)
  '35801801': { brand: 'LG', model: 'K62+', modelNumber: 'LM-K525BAW' },
  '35801802': { brand: 'LG', model: 'K52', modelNumber: 'LM-K520BMW' },

  // Padrões genéricos por prefixos de marca
  '358008': { brand: 'Samsung', model: 'Galaxy Smartphone', modelNumber: 'Generic' },
  '358009': { brand: 'Motorola', model: 'Moto Smartphone', modelNumber: 'Generic' },
  '358011': { brand: 'Nokia', model: 'Nokia Smartphone', modelNumber: 'Generic' },
  '358012': { brand: 'Xiaomi', model: 'Xiaomi Smartphone', modelNumber: 'Generic' },
  '358013': { brand: 'Realme', model: 'Realme Smartphone', modelNumber: 'Generic' },
  '358014': { brand: 'Oppo', model: 'Oppo Smartphone', modelNumber: 'Generic' },
  '358015': { brand: 'Vivo', model: 'Vivo Smartphone', modelNumber: 'Generic' },
  '358016': { brand: 'OnePlus', model: 'OnePlus Smartphone', modelNumber: 'Generic' },
  '358017': { brand: 'Google', model: 'Pixel Smartphone', modelNumber: 'Generic' },
};
