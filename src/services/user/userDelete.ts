
import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new Error("ID do usuário é obrigatório");
  }

  log("info", "Deleting user and related data", { id });

  // First update network references to maintain structure
  try {
    // Get the network entry for this user
    const { data: networkData } = await supabase
      .from('network')
      .select('id, parent_id')
      .eq('user_id', id)
      .single();
    
    if (networkData) {
      // Get all direct children of this user
      const { data: childrenData } = await supabase
        .from('network')
        .select('id')
        .eq('parent_id', networkData.id);
      
      if (childrenData && childrenData.length > 0) {
        // Update all children to connect to the parent of deleted user
        await supabase
          .from('network')
          .update({ parent_id: networkData.parent_id })
          .in('id', childrenData.map(child => child.id));
        
        log("info", "Updated network children references", { 
          userId: id, 
          childrenCount: childrenData.length 
        });
      }
    }
  } catch (err) {
    log("warning", "Error updating network references before deletion", { id, error: err });
    // Continue with deletion anyway
  }

  // Now delete the user and related data
  const { error } = await supabase
    .rpc('delete_user_and_related_data', { user_id: id });

  if (error) {
    log("error", "Error deleting user", { id, error });
    throw error;
  }

  log("info", "User and related data deleted successfully", { id });
};
