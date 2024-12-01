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
      
      // Se o membro está no nível desejado, adiciona ele com seus filhos
      if (member.level === level) {
        console.log(`Found matching member:`, member);
        acc.push({
          ...member,
          children: member.children || [] // Mantém os filhos para preservar a estrutura
        });
      } else if (member.level < level) {
        // Se o membro está em um nível anterior ao desejado, verifica os filhos
        if (member.children && member.children.length > 0) {
          console.log(`Checking children of member ${member.id}`);
          const filteredChildren = filterByLevel(member.children);
          
          if (filteredChildren.length > 0) {
            // Se encontrou filhos no nível desejado, adiciona o membro com os filhos filtrados
            console.log(`Adding member with filtered children:`, member.id);
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

  const filteredData = filterByLevel(data);
  console.log("Final filtered data:", filteredData);
  return filteredData;
};