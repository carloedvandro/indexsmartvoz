
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data || data.length === 0) {
    console.log("No network data available to filter");
    return [];
  }
  
  // If "all" is selected, return the complete structure without filtering
  if (selectedLevel === "all") {
    console.log("Showing all network levels:", data.length, "root members");
    return data;
  }
  
  const level = parseInt(selectedLevel);
  console.log(`Filtering for level ${level} members`);
  
  // For storing filtered results
  const result: NetworkMember[] = [];
  
  // Function to find members of a specific level
  const findMembersByLevel = (members: NetworkMember[], currentLevel: number = 1) => {
    if (!members || members.length === 0) return;
    
    members.forEach(member => {
      // If we're at the desired level, add the member to the result
      if (currentLevel === level) {
        // Check to avoid duplicate members with the same user.id
        if (!result.some(m => m.user?.id === member.user?.id)) {
          console.log(`Adding level ${level} member: ${member.user?.full_name || 'Unknown name'}`);
          result.push({
            ...member,
            children: [] // Remove children when finding the desired level
          });
        }
      }
      
      // Continue searching in children if we haven't reached the desired level
      if (currentLevel < level && member.children && member.children.length > 0) {
        findMembersByLevel(member.children, currentLevel + 1);
      }
    });
  };
  
  // Start search from level 1
  findMembersByLevel(data);
  
  console.log(`Found ${result.length} members at level ${level}`);
  return result;
};
