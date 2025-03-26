
import { NetworkMember } from "@/components/client/network/types";

export const countMembersByStatus = (members: NetworkMember[]) => {
  if (!members || !Array.isArray(members)) {
    return { active: 0, pending: 0 };
  }
  
  let active = 0;
  let pending = 0;

  const countStatus = (member: NetworkMember) => {
    if (!member || !member.user) {
      return; // Skip invalid members
    }
    
    if (member.user.status === 'active') {
      active++;
    } else {
      pending++;
    }

    if (member.children && member.children.length > 0) {
      member.children.forEach(countStatus);
    }
  };

  members.forEach(countStatus);
  return { active, pending };
};
