import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  console.log("Filtering network data:", { data, selectedLevel });
  
  if (!data) return [];
  if (selectedLevel === "all") return data;
  
  const level = parseInt(selectedLevel);
  console.log("Filtering for level:", level);
  
  const filterByLevel = (members: NetworkMember[]): NetworkMember[] => {
    return members.reduce<NetworkMember[]>((acc, member) => {
      console.log(`Checking member ${member.id} with level ${member.level}`);
      
      if (member.level === level) {
        // Se o membro está no nível desejado, adiciona ele sem filhos
        console.log(`Found matching member:`, member);
        acc.push({
          ...member,
          children: [] // Remove os filhos quando encontra o nível desejado
        });
      } else if (member.level < level && member.children && member.children.length > 0) {
        // Se o membro está em um nível anterior e tem filhos, continua procurando
        console.log(`Checking children of member ${member.id}`);
        const filteredChildren = filterByLevel(member.children);
        
        if (filteredChildren.length > 0) {
          // Se encontrou filhos no nível desejado, adiciona o membro com apenas esses filhos
          acc.push({
            ...member,
            children: filteredChildren
          });
        }
      }
      
      return acc;
    }, []);
  };

  const filteredData = filterByLevel(data);
  console.log("Final filtered data:", filteredData);
  return filteredData;
};