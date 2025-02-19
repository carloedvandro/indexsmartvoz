import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  if (selectedLevel === "all") return data;
  
  const level = parseInt(selectedLevel);
  
  const filterByLevel = (members: NetworkMember[]): NetworkMember[] => {
    return members.reduce<NetworkMember[]>((acc, member) => {
      if (member.level === level) {
        // Se encontrou um membro do nível desejado, adiciona ele sem filhos
        acc.push({
          ...member,
          children: [] // Remove os filhos quando encontra o nível desejado
        });
      } else if (member.children && member.children.length > 0) {
        // Se tem filhos, procura nos filhos
        const filteredChildren = filterByLevel(member.children);
        if (filteredChildren.length > 0) {
          // Se encontrou filhos no nível desejado, adiciona apenas os filhos filtrados
          acc.push(...filteredChildren);
        }
      }
      
      return acc;
    }, []);
  };

  return filterByLevel(data);
};