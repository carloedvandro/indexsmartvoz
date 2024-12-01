import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  if (selectedLevel === "all") return data;
  
  const level = parseInt(selectedLevel);
  
  // Função recursiva para encontrar membros do nível específico
  const filterByLevel = (members: NetworkMember[]): NetworkMember[] => {
    return members.filter(member => member.level === level);
  };

  // Aplica o filtro em toda a árvore
  const findMembersAtLevel = (members: NetworkMember[]): NetworkMember[] => {
    const directMatches = filterByLevel(members);
    
    // Se encontrou membros no nível atual, retorna eles
    if (directMatches.length > 0) {
      return directMatches;
    }
    
    // Se não encontrou, procura nos filhos
    const childrenMatches = members.reduce<NetworkMember[]>((acc, member) => {
      if (member.children && member.children.length > 0) {
        const matches = findMembersAtLevel(member.children);
        return [...acc, ...matches];
      }
      return acc;
    }, []);
    
    return childrenMatches;
  };

  return findMembersAtLevel(data);
};