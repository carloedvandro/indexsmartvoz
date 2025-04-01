
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
  
  // Log do nome do usuário e margem que será aplicada para Domingos
  if (isDomingosPinto) {
    console.log('Aplicando margin-left 0px para Domingos com timestamp:', new Date().getTime());
  }
  
  // Log para Carlo Gonçalves
  if (isCarloGoncalves) {
    console.log('Aplicando margin-left 0.5px para Carlo com timestamp:', new Date().getTime());
  }
  
  // Log para Gesia Almeida
  if (isGesiaAlmeida) {
    console.log('Aplicando margin-left para Gesia:', isAllLevels ? '3.8px' : '4px', 'com timestamp:', new Date().getTime());
  }
  
  return isDavidForgat ? `calc(-10px + ${allLevelsMargin})` : // Movido 1px para direita (era -11px)
         isCarolinaTree ? `calc(28mm + ${allLevelsMargin})` : // Movido 1px para direita (era 27mm)
         isRubensTree ? `calc(4.5mm + ${allLevelsMargin})` : // Movido 1px para direita (era 3.5mm)
         isMarcioSilva ? `calc(29.5px + ${allLevelsMargin})` : // Movido 1px para direita (era 28.5px)
         isMarcioSales ? `calc(29px + ${allLevelsMargin})` : // Movido 1px para direita (era 28px)
         isCarloGoncalves ? `calc(0.5px + ${allLevelsMargin})` : // Movido 0.5px para esquerda (era 1px)
         isDomingosPinto ? `calc(0px + ${allLevelsMargin})` : // Movido 0.5px para esquerda (era 0.5px)
         isVandoMacedo ? `calc(6px + ${allLevelsMargin})` : // Movido 6px para direita (era 0px)
         isDierroLeal ? `calc(-2px + ${allLevelsMargin})` : // Movido 1px para direita (era -3px)
         isRudneyNobrega ? `calc(29px + ${allLevelsMargin})` : // Movido 1px para direita (era 28px)
         isGesiaAlmeida ? isAllLevels ? 'calc(3.8px)' : 'calc(4px)' : // Movido 0.2px para esquerda no modo "Todos os Níveis"
         depth === 2 ? `calc(7px + ${allLevelsMargin})` : // Movido 1px para direita (era 6px)
         isRuiTree ? `calc(9px + ${allLevelsMargin})` : // Movido 1px para direita (era 8px)
         member.user.custom_id === 'vania' ? `calc(24.5px + ${allLevelsMargin})` : // Movido 1px para direita (era 23.5px)
         (depth === 0 ? `calc(-4px + ${allLevelsMargin})` : `calc(4px + ${allLevelsMargin})`); // Movido 1px para direita
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
    return '8px'; // Ajustado para 8px (era 6px + 2px adicionais)
  } else if (isMarcioSilva || isMarcioSales || isDomingosPinto || 
            isVandoMacedo || isDierroLeal || isRudneyNobrega || isGesiaAlmeida) {
    return '2px'; // Movido 2px para baixo
  }
  
  return '0px';
};
