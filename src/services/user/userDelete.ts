
import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new Error("ID do usuário é obrigatório");
  }

  log("info", "Deleting user and related data", { id });

  try {
    // First, delete related data in the network table
    const { error: networkError } = await supabase
      .from("network")
      .delete()
      .eq("user_id", id);

    if (networkError) {
      log("error", "Error deleting network data", { id, error: networkError });
      console.error("Error deleting network data:", networkError);
    }

    // Delete the profile (which should cascade to auth.users with the RPC function)
    const { error } = await supabase
      .rpc('delete_user_and_related_data', { user_id: id });

    if (error) {
      log("error", "Error deleting user", { id, error });
      throw error;
    }

    // If the RPC function fails for some reason, try direct deletion as fallback
    if (error) {
      // Direct deletion of profile
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);
        
      if (profileError) {
        log("error", "Error deleting profile directly", { id, error: profileError });
        throw profileError;
      }
      
      // Direct deletion from auth.users using service role (requires proper permissions)
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      
      if (authError) {
        log("error", "Error deleting auth user directly", { id, error: authError });
        throw authError;
      }
    }

    log("info", "User and related data deleted successfully", { id });
  } catch (error) {
    log("error", "Exception in deleteUser function", { id, error });
    throw error;
  }
};
