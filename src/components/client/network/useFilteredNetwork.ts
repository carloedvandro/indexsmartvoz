
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // If "all", return the complete structure without filtering
  if (selectedLevel === "all") {
    console.log("Returning all levels:", data);
    return data;
  }
  
  const level = parseInt(selectedLevel);
  
  // For storing filtered results
  const result: NetworkMember[] = [];
  
  // Tracking processed user IDs to avoid duplicates
  const processedUserIds = new Set<string>();
  
  // Function to find members at a specific level by traversing the entire tree
  const findMembersByLevel = (members: NetworkMember[], currentLevel: number = 1) => {
    if (!members || members.length === 0) return;
    
    // If we're at the desired level, add all members at this level to the result
    if (currentLevel === level) {
      members.forEach(member => {
        // Only add the member if we haven't processed this user ID before
        if (!processedUserIds.has(member.user.id)) {
          processedUserIds.add(member.user.id);
          
          // Add a copy of the member without children to avoid unwanted nesting
          result.push({
            ...member,
            children: [] // Remove children when we've found the desired level
          });
        }
      });
      return; // No need to go deeper if we're at the target level
    }
    
    // If we're not at the desired level yet, continue searching in children
    if (currentLevel < level) {
      members.forEach(member => {
        if (member.children && member.children.length > 0) {
          findMembersByLevel(member.children, currentLevel + 1);
        }
      });
    }
  };
  
  // Start searching from level 1 (the root members)
  findMembersByLevel(data);
  
  console.log(`Filtered data for level ${level}:`, result);
  return result;
};
