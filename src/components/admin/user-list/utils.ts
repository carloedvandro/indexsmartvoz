
// Helper function to display user ID properly
export const displayCustomId = (user: any) => {
  // Only return if both custom_id and external_id are available
  if (user?.custom_id) return user.custom_id;
  if (user?.external_id) return user.external_id;
  return ""; // Return empty string if no ID exists
};
