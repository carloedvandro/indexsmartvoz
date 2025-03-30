
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
  // Adding 4px additional right margin when showing all levels
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
  
  return isDavidForgat ? `calc(-9px + ${allLevelsMargin})` : 
         isCarolinaTree ? `calc(29mm + ${allLevelsMargin})` : 
         isRubensTree ? `calc(5.5mm + ${allLevelsMargin})` : 
         isMarcioSilva ? `calc(3px + ${allLevelsMargin})` : // Movido 0.5px mais para esquerda (era 3.5px)
         isMarcioSales ? `calc(2.5px + ${allLevelsMargin})` : // Movido 0.5px mais para esquerda (era 3px)
         isCarloGoncalves ? `calc(2px + ${allLevelsMargin})` : // Mantido em 2px
         isDomingosPinto ? `calc(3px + ${allLevelsMargin})` : // Movido 0.5px mais para direita (agora 3px, era 2.5px)
         isVandoMacedo ? `calc(1px + ${allLevelsMargin})` : // Mantido em 1px
         isDierroLeal ? `calc(-1px + ${allLevelsMargin})` : // Mantido em -1px
         isRudneyNobrega ? `calc(30px + ${allLevelsMargin})` : // Mantido em 30px
         depth === 2 ? `calc(8px + ${allLevelsMargin})` : 
         isRuiTree ? `calc(10px + ${allLevelsMargin})` : 
         member.user.custom_id === 'vania' ? `calc(25.5px + ${allLevelsMargin})` :
         (depth === 0 ? `calc(-3px + ${allLevelsMargin})` : `calc(5px + ${allLevelsMargin})`);
};

// Adding a new function to calculate vertical margin if needed
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
    return '8px'; // Mantido em 8px
  } else if (isMarcioSilva || isMarcioSales || isDomingosPinto || 
            isVandoMacedo || isDierroLeal || isRudneyNobrega || isGesiaAlmeida) {
    return '2px'; // Mantido em 2px
  }
  
  return '0px';
};
