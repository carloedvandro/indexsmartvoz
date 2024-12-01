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
      
      // Se o membro está no nível desejado, adiciona ele e seus filhos
      if (member.level === level) {
        console.log(`Found matching member:`, member);
        acc.push(member);
      } else {
        // Se o membro tem filhos, verifica recursivamente
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