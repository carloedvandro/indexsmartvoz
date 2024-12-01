import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  if (selectedLevel === "all") return data;
  
  const level = parseInt(selectedLevel);
  
  const filterByLevel = (members: NetworkMember[]): NetworkMember[] => {
    return members.reduce<NetworkMember[]>((acc, member) => {
      if (member.level === level) {
        acc.push(member);
      } else if (member.children && member.children.length > 0) {
        const filteredChildren = filterByLevel(member.children);
        if (filteredChildren.length > 0) {
          acc.push({
            ...member,
            children: filteredChildren
          });
        }
      }
      return acc;
    }, []);
  };

  return filterByLevel(data);
};