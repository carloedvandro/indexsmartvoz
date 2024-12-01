import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  console.log("Filtering network data:", { data, selectedLevel });
  
  if (!data) return [];
  if (selectedLevel === "all") return data;
  
  const level = parseInt(selectedLevel);
  console.log("Filtering for level:", level);
  
  const filterByLevel = (members: NetworkMember[]): NetworkMember[] => {
    const result = members.reduce<NetworkMember[]>((acc, member) => {
      console.log(`Checking member ${member.id} with level ${member.level}`);
      
      if (member.level === level) {
        // Se o membro está no nível desejado, adiciona ele sem os filhos
        console.log(`Found matching member:`, member);
        acc.push({ ...member, children: [] });
      } else if (member.children && member.children.length > 0) {
        // Se o membro não está no nível desejado, mas pode ter filhos no nível
        console.log(`Checking children of member ${member.id}`);
        const filteredChildren = filterByLevel(member.children);
        
        if (filteredChildren.length > 0) {
          // Se encontrou filhos no nível desejado, adiciona o membro com os filhos filtrados
          console.log(`Adding parent with filtered children:`, member.id);
          acc.push({
            ...member,
            children: filteredChildren
          });
        }
      }
      
      return acc;
    }, []);
    
    console.log("Filtered results:", result);
    return result;
  };

  const filteredData = filterByLevel(data);
  console.log("Final filtered data:", filteredData);
  return filteredData;
};