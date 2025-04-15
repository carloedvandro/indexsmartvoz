import { NetworkMember } from "@/components/client/network/types";

export const countMembersByStatus = (members: NetworkMember[]) => {
  let active = 0;
  let pending = 0;

  const countStatus = (member: NetworkMember) => {
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