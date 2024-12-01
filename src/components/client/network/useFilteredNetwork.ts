import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (selectedLevel === "all") return data;
  
  return data.reduce<NetworkMember[]>((acc, member) => {
    if (member.level === parseInt(selectedLevel)) {
      acc.push(member);
    } else if (member.children) {
      const filteredChildren = useFilteredNetwork(member.children, selectedLevel);
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