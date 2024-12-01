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
        console.log(`Found matching member:`, member);
        acc.push({ ...member, children: [] });
      }
      
      if (member.children && member.children.length > 0) {
        console.log(`Checking children of member ${member.id}`);
        const filteredChildren = filterByLevel(member.children);
        
        if (filteredChildren.length > 0) {
          if (member.level === level) {
            const existingMember = acc.find(m => m.id === member.id);
            if (existingMember) {
              console.log(`Updating existing member's children:`, member.id);
              existingMember.children = filteredChildren;
            }
          } else {
            console.log(`Adding parent with filtered children:`, member.id);
            acc.push({
              ...member,
              children: filteredChildren
            });
          }
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