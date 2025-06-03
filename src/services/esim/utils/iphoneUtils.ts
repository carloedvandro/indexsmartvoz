
// iPhone specific identification utilities

export const identifyIPhoneModel = (tac: string): { model: string; modelNumber: string } => {
  const tacStr = tac.toString();
  
  // Verificar com padrões conhecidos do iPhone
  if (tacStr.startsWith('353281') || tacStr.startsWith('358403') || 
      tacStr.startsWith('359229') || tacStr.startsWith('357307') ||
      tacStr.startsWith('355608') || tacStr.startsWith('352094')) {
    
    // Tentar identificar geração do iPhone baseado em padrões do TAC
    if (tacStr.includes('323') || tacStr.includes('324')) {
      return { model: 'iPhone 15 Series', modelNumber: tac };
    } else if (tacStr.includes('321') || tacStr.includes('322')) {
      return { model: 'iPhone 14 Series', modelNumber: tac };
    } else if (tacStr.includes('319') || tacStr.includes('320')) {
      return { model: 'iPhone 13 Series', modelNumber: tac };
    } else if (tacStr.includes('317') || tacStr.includes('318')) {
      return { model: 'iPhone 12 Series', modelNumber: tac };
    } else if (tacStr.includes('315') || tacStr.includes('316')) {
      return { model: 'iPhone 11 Series', modelNumber: tac };
    }
  }
  
  return { model: 'iPhone', modelNumber: tac };
};
