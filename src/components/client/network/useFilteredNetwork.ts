
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // Se for "all", retorna a estrutura completa sem filtragem
  if (selectedLevel === "all") {
    console.log("Retornando todos os níveis:", data);
    return data;
  }
  
  const level = parseInt(selectedLevel);
  
  const filterByLevel = (members: NetworkMember[], currentLevel: number = 1): NetworkMember[] => {
    if (!members || members.length === 0) return [];
    
    if (currentLevel === level) {
      return members.map(member => ({
        ...member,
        children: [] // Remove os filhos quando encontra o nível desejado
      }));
    }
    
    return members.reduce<NetworkMember[]>((acc, member) => {
      const filteredChildren = filterByLevel(member.children || [], currentLevel + 1);
      
      if (filteredChildren.length > 0) {
        acc.push({
          ...member,
          children: filteredChildren
        });
      }
      
      return acc;
    }, []);
  };

  const filteredData = filterByLevel(data);
  console.log("Dados filtrados:", filteredData);
  return filteredData;
};
