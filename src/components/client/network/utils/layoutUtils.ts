
import { NetworkMember } from "../types";

export const calculateTotalTeamSize = (node: NetworkMember): number => {
  if (!node.children || node.children.length === 0) {
    return 0;
  }
  
  return node.children.reduce((total, child) => {
    return total + 1 + calculateTotalTeamSize(child);
  }, 0);
};

export const calculateNodeMargin = (
  member: NetworkMember,
  depth: number,
  isAllLevels: boolean
): string => {
  // Restaurando a margem original para modo "Todos os Níveis"
  const allLevelsMargin = isAllLevels ? '4px' : '0px';
  
  const isDavidForgat = member.user.full_name === 'David Forgat';
  const isCarolinaTree = member.user.full_name?.trim() === 'Carolina Bezzera e Silva';
  const isRubensTree = member.user.full_name === 'Rubens Valin';
  const isRuiTree = member.user.full_name === 'Rui Barbosa' || 
                    (member.parent_id && member.user.custom_id?.startsWith('rui-'));
  const isVaniaTree = member.user.custom_id === 'vania' || 
                     (member.parent_id && member.user.custom_id?.startsWith('vania-'));
  const isMarcioSilva = member.user.full_name === 'Marcio Bettanzos da Silva';
  const isMarcioSales = member.user.full_name === 'Marcio Sales Sousa';
  const isCarloGoncalves = member.user.full_name === 'Carlo Edvandro Camera Gonçalves';
  const isDomingosPinto = member.user.full_name === 'Domingos Ferreira Pinto';
  const isVandoMacedo = member.user.full_name === 'Vando Araujo Macedo';
  const isDierroLeal = member.user.full_name === 'Dierro Santana Leal';
  const isRudneyNobrega = member.user.full_name === 'Rudney de Souza Nobrega';
  const isGesiaAlmeida = member.user.full_name === 'Gesia Almeida Dos Santos';
  
  // Restaurando os valores originais para "Todos os Níveis"
  return isDavidForgat ? `calc(-9px + ${allLevelsMargin})` : // Restaurado para o valor original
         isCarolinaTree ? `calc(29mm + ${allLevelsMargin})` : // Restaurado para o valor original
         isRubensTree ? `calc(5.5mm + ${allLevelsMargin})` : // Restaurado para o valor original
         isMarcioSilva ? (isAllLevels ? `calc(30.5px + ${allLevelsMargin})` : "28.5px") : // Valor específico por tipo de visualização
         isMarcioSales ? (isAllLevels ? `calc(30px + ${allLevelsMargin})` : "28px") : // Valor específico por tipo de visualização
         isCarloGoncalves ? (isAllLevels ? `calc(2px + ${allLevelsMargin})` : "0px") : // Valor específico por tipo de visualização
         isDomingosPinto ? (isAllLevels ? `calc(0px + ${allLevelsMargin})` : "-2px") : // Valor específico por tipo de visualização
         isVandoMacedo ? (isAllLevels ? `calc(1px + ${allLevelsMargin})` : "-1px") : // Valor específico por tipo de visualização
         isDierroLeal ? (isAllLevels ? `calc(-1px + ${allLevelsMargin})` : "-3px") : // Valor específico por tipo de visualização
         isRudneyNobrega ? (isAllLevels ? `calc(30px + ${allLevelsMargin})` : "28px") : // Valor específico por tipo de visualização
         isGesiaAlmeida ? (isAllLevels ? `calc(0px + ${allLevelsMargin})` : "-2px") : // Valor específico por tipo de visualização
         depth === 2 ? `calc(8px + ${allLevelsMargin})` : // Restaurado para o valor original
         isRuiTree ? `calc(10px + ${allLevelsMargin})` : // Restaurado para o valor original
         member.user.custom_id === 'vania' ? `calc(25.5px + ${allLevelsMargin})` : // Restaurado para o valor original
         (depth === 0 ? `calc(-3px + ${allLevelsMargin})` : `calc(5px + ${allLevelsMargin})`); // Restaurado para o valor original
};

// Mantendo a função que calcula a margem vertical
export const calculateNodeVerticalMargin = (
  member: NetworkMember
): string => {
  const isCarloGoncalves = member.user.full_name === 'Carlo Edvandro Camera Gonçalves';
  const isMarcioSilva = member.user.full_name === 'Marcio Bettanzos da Silva';
  const isMarcioSales = member.user.full_name === 'Marcio Sales Sousa';
  const isDomingosPinto = member.user.full_name === 'Domingos Ferreira Pinto';
  const isVandoMacedo = member.user.full_name === 'Vando Araujo Macedo';
  const isDierroLeal = member.user.full_name === 'Dierro Santana Leal';
  const isRudneyNobrega = member.user.full_name === 'Rudney de Souza Nobrega';
  const isGesiaAlmeida = member.user.full_name === 'Gesia Almeida Dos Santos';
  
  if (isCarloGoncalves) {
    return '8px';
  } else if (isMarcioSilva || isMarcioSales || isDomingosPinto || 
            isVandoMacedo || isDierroLeal || isRudneyNobrega || isGesiaAlmeida) {
    return '2px';
  }
  
  return '0px';
};
