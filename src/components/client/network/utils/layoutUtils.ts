
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
  
  return isDavidForgat ? `calc(-9px + ${allLevelsMargin})` : 
         isCarolinaTree ? `calc(29mm + ${allLevelsMargin})` : 
         isRubensTree ? `calc(5.5mm + ${allLevelsMargin})` : 
         isMarcioSilva ? `calc(34px + ${allLevelsMargin})` : // Valor original
         isMarcioSales ? `calc(6px + ${allLevelsMargin})` : // Movido 6px para a direita
         isCarloGoncalves ? `calc(-1px + ${allLevelsMargin})` : // Valor original restaurado
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
  
  return isCarloGoncalves ? '6px' : '0px';
};
