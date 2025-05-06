import { NetworkMember } from "@/components/client/network/types";

// Function to calculate the left margin for each node based on its depth
export const calculateNodeMargin = (member: NetworkMember, depth: number, isAllLevels: boolean): string => {
  if (!isAllLevels) {
    return '0px';
  }
  
  let baseMargin = 20; // Base margin in pixels
  let levelMargin = depth * baseMargin; // Increase margin for each level
  
  // Adjustments for specific individuals
  if (member.user.custom_id === 'vania') {
    levelMargin = 0; // No margin for Vania
  } else if (member.user.custom_id === 'Gesia89') {
    levelMargin = 0; // No margin for Gesia
  }
  
  return `${levelMargin}px`;
};

// Function to calculate the top margin for specific nodes
export const calculateNodeVerticalMargin = (member: NetworkMember): string => {
  if (member.user.custom_id === 'Gesia89') {
    return '-10px'; // Gesia moves up
  }
  return '0px'; // Default no margin
};

// Add this function to count the total team size recursively
export const calculateTotalTeamSize = (member: any): number => {
  if (!member.children || !Array.isArray(member.children)) {
    return 0;
  }
  
  let totalSize = member.children.length;
  
  // Recursively count all descendants
  for (const child of member.children) {
    totalSize += calculateTotalTeamSize(child);
  }
  
  return totalSize;
};

// Importing supabase at the end to avoid circular imports
import { supabase } from "@/integrations/supabase/client";
