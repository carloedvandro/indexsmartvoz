
// TAC pattern identification utilities

export const identifyBrandByTacPatterns = (tac: string): string => {
  const tacPrefix3 = tac.substring(0, 3);
  
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
  
  return 'Android';
};

export const generateTacPrefixes = (tac: string): string[] => {
  return [
    tac.substring(0, 8),
    tac.substring(0, 7),
    tac.substring(0, 6),
    tac.substring(0, 5),
    tac.substring(0, 4),
    tac.substring(0, 3)
  ];
};
