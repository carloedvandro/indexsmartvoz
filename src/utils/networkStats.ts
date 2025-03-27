
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
    } else if (member.user.status === 'pending') {
      pending++;
    }

    if (member.children && member.children.length > 0) {
      member.children.forEach(countStatus);
    }
  };

  members.forEach(countStatus);
  return { active, pending };
};

// Helper function to check if a user is deleted
export const isUserDeleted = async (userId: string): Promise<boolean> => {
  if (!userId) return true;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
    
  if (error || !data) {
    console.log(`User ${userId} appears to be deleted or not found`);
    return true;
  }
  
  return false;
};

// Helper to filter out deleted users from network data
export const filterDeletedUsers = async (members: NetworkMember[]): Promise<NetworkMember[]> => {
  if (!members || !Array.isArray(members) || members.length === 0) {
    return [];
  }
  
  // Get all user IDs to check in a single query
  const userIds = members.map(member => member.user?.id).filter(Boolean) as string[];
  
  if (userIds.length === 0) return [];
  
  // Check which profiles still exist
  const { data: existingProfiles } = await supabase
    .from('profiles')
    .select('id')
    .in('id', userIds);
    
  const existingUserIds = new Set(existingProfiles?.map(p => p.id) || []);
  
  // Filter out members whose profiles don't exist
  return members.filter(member => 
    member.user?.id && existingUserIds.has(member.user.id)
  );
};

// Importing supabase at the end to avoid circular imports
import { supabase } from "@/integrations/supabase/client";
