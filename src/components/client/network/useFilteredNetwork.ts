
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  if (selectedLevel === "all") return data.map(member => ({
    id: member.id,
    full_name: member.user.full_name || '',
    avatar_url: null,
    level: member.level,
    status: member.user.status || 'pending',
    username: member.user.custom_id || '',
    created_at: member.user.registration_date || new Date().toISOString(),
    direct_members: 0,
    team_members: 0
  }));
  
  const level = parseInt(selectedLevel);
  
  const filterByLevel = (members: NetworkMember[]) => {
    return members.reduce<any[]>((acc, member) => {
      if (member.level === level) {
        acc.push({
          id: member.id,
          full_name: member.user.full_name || '',
          avatar_url: null,
          level: member.level,
          status: member.user.status || 'pending',
          username: member.user.custom_id || '',
          created_at: member.user.registration_date || new Date().toISOString(),
          direct_members: 0,
          team_members: 0
        });
      } else if (member.children && member.children.length > 0) {
        const filteredChildren = filterByLevel(member.children);
        if (filteredChildren.length > 0) {
          acc.push(...filteredChildren);
        }
      }
      
      return acc;
    }, []);
  };

  return filterByLevel(data);
};
