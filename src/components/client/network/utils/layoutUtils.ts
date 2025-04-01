
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
  
  return isDavidForgat ? `calc(-15px + ${allLevelsMargin})` : // Movido 5px para esquerda (era -10px)
         isCarolinaTree ? `calc(23mm + ${allLevelsMargin})` : // Movido 5px para esquerda (era 28mm)
         isRubensTree ? `calc(-0.5mm + ${allLevelsMargin})` : // Movido 5px para esquerda (era 4.5mm)
         isMarcioSilva ? `calc(24.5px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 29.5px)
         isMarcioSales ? `calc(24px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 29px)
         isCarloGoncalves ? `calc(-0.5px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 4.5px)
         isDomingosPinto ? `calc(0.5px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 5.5px)
         isVandoMacedo ? `calc(0.5px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 5.5px)
         isDierroLeal ? `calc(-7px + ${allLevelsMargin})` : // Movido 5px para esquerda (era -2px)
         isRudneyNobrega ? `calc(24px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 29px)
         isGesiaAlmeida ? `calc(-1px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 4px)
         depth === 2 ? `calc(2px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 7px)
         isRuiTree ? `calc(4px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 9px)
         member.user.custom_id === 'vania' ? `calc(19.5px + ${allLevelsMargin})` : // Movido 5px para esquerda (era 24.5px)
         (depth === 0 ? `calc(-9px + ${allLevelsMargin})` : `calc(-1px + ${allLevelsMargin})`); // Movido 5px para esquerda
};

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
