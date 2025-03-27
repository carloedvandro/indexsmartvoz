
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // If "all" is selected, return the complete structure without filtering
  if (selectedLevel === "all") {
    console.log("Returning all levels:", data);
    return data;
  }
  
  const level = parseInt(selectedLevel);
  
  // For storing filtered results
  const result: NetworkMember[] = [];
  
  // Function to find members of a specific level
  const findMembersByLevel = (members: NetworkMember[], currentLevel: number = 1) => {
    if (!members || members.length === 0) return;
    
    members.forEach(member => {
      // If we're at the desired level, add the member to the result
      if (currentLevel === level) {
        // Check to avoid duplicate members with the same user.id
        if (!result.some(m => m.user.id === member.user.id)) {
          // Add the member with its children for expandability
          result.push({
            ...member
          });
        }
      }
      
      // Continue searching in children if we haven't reached the desired level
      if (currentLevel < level && member.children && member.children.length > 0) {
        findMembersByLevel(member.children, currentLevel + 1);
      }
    });
  };
  
  // Start the search from level 1
  findMembersByLevel(data);
  
  console.log(`Filtered data for level ${level}:`, result);
  return result;
};
