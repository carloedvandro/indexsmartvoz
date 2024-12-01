import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  if (selectedLevel === "all") return data;
  
  const level = parseInt(selectedLevel);
  
  // Função recursiva para encontrar membros do nível específico e manter a estrutura da árvore
  const filterByLevel = (members: NetworkMember[]): NetworkMember[] => {
    return members.reduce<NetworkMember[]>((acc, member) => {
      // Se o membro atual está no nível desejado, adiciona ele
      if (member.level === level) {
        acc.push({ ...member, children: [] });
      }
      
      // Se tem filhos, procura recursivamente neles também
      if (member.children && member.children.length > 0) {
        const filteredChildren = filterByLevel(member.children);
        if (filteredChildren.length > 0) {
          // Se encontrou filhos no nível desejado, adiciona o membro atual com os filhos filtrados
          if (member.level === level) {
            // Se o membro atual já foi adicionado, apenas atualiza seus filhos
            const existingMember = acc.find(m => m.id === member.id);
            if (existingMember) {
              existingMember.children = filteredChildren;
            }
          } else {
            // Se o membro atual não está no nível desejado, mas tem filhos que estão
            acc.push({
              ...member,
              children: filteredChildren
            });
          }
        }
      }
      
      return acc;
    }, []);
  };

  return filterByLevel(data);
};