
import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new Error("ID do usuário é obrigatório");
  }

  log("info", "Deleting user and related data", { id });

  try {
    // Step 1: Delete all related records in various tables
    
    // Delete any network data
    const { error: networkError } = await supabase
      .from("network")
      .delete()
      .eq("user_id", id);
    
    if (networkError) {
      log("error", "Error deleting network data", { id, error: networkError });
      console.error("Error deleting network data:", networkError);
    }

    // Delete any store products
    const { error: storeError } = await supabase
      .from("store_products")
      .delete()
      .eq("user_id", id);
      
    if (storeError) {
      log("error", "Error deleting store products", { id, error: storeError });
      console.error("Error deleting store products:", storeError);
    }
    
    // Delete any phone lines
    const { error: phoneLinesError } = await supabase
      .from("phone_lines")
      .delete()
      .eq("owner_id", id);
      
    if (phoneLinesError) {
      log("error", "Error deleting phone lines", { id, error: phoneLinesError });
      console.error("Error deleting phone lines:", phoneLinesError);
    }
    
    // Delete any data usage records
    const { error: dataUsageError } = await supabase
      .from("data_usage")
      .delete()
      .eq("user_id", id);
      
    if (dataUsageError) {
      log("error", "Error deleting data usage", { id, error: dataUsageError });
      console.error("Error deleting data usage:", dataUsageError);
    }
    
    // Delete any document verifications
    const { error: docVerificationsError } = await supabase
      .from("document_verifications")
      .delete()
      .eq("user_id", id);
      
    if (docVerificationsError) {
      log("error", "Error deleting document verifications", { id, error: docVerificationsError });
      console.error("Error deleting document verifications:", docVerificationsError);
    }
    
    // Delete any earnings settings
    const { error: earningsError } = await supabase
      .from("earnings_settings")
      .delete()
      .eq("user_id", id);
      
    if (earningsError) {
      log("error", "Error deleting earnings settings", { id, error: earningsError });
      console.error("Error deleting earnings settings:", earningsError);
    }

    // Step 2: Delete the profile (which should cascade to auth.users)
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);
      
    if (profileError) {
      log("error", "Error deleting profile", { id, error: profileError });
      console.error("Error deleting profile:", profileError);
      
      // If profile deletion fails, try using the RPC function as backup
      const { error: rpcError } = await supabase
        .rpc('delete_user_and_related_data', { user_id: id });
        
      if (rpcError) {
        log("error", "Error deleting user via RPC", { id, error: rpcError });
        console.error("Error deleting user via RPC:", rpcError);
        
        // If the RPC function fails, try direct deletion from auth.users as last resort
        const { error: authError } = await supabase.auth.admin.deleteUser(id);
        
        if (authError) {
          log("error", "Error deleting auth user directly", { id, error: authError });
          throw new Error(`Failed to delete user: ${authError.message}`);
        }
      }
    }

    log("info", "User and related data deleted successfully", { id });
    return { success: true };
  } catch (error) {
    log("error", "Exception in deleteUser function", { id, error });
    console.error("Error deleting user:", error);
    throw error;
  }
};
