
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

    // Delete child network records where this user is a parent
    const { error: childNetworkError } = await supabase
      .from("network")
      .delete()
      .eq("parent_id", id);
    
    if (childNetworkError) {
      log("error", "Error deleting child network data", { id, error: childNetworkError });
      console.error("Error deleting child network data:", childNetworkError);
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

    // Delete any user verifications
    const { error: userVerificationsError } = await supabase
      .from("user_verifications")
      .delete()
      .eq("user_id", id);
      
    if (userVerificationsError) {
      log("error", "Error deleting user verifications", { id, error: userVerificationsError });
      console.error("Error deleting user verifications:", userVerificationsError);
    }

    // Delete any commission history
    const { error: commissionError } = await supabase
      .from("network_commission_history")
      .delete()
      .eq("user_id", id);
      
    if (commissionError) {
      log("error", "Error deleting commission history", { id, error: commissionError });
      console.error("Error deleting commission history:", commissionError);
    }

    // Step 2: Try direct auth deletion first, then delete profile
    try {
      log("info", "Attempting direct auth user deletion", { id });
      const { error: directAuthError } = await supabase.auth.admin.deleteUser(id);
      
      if (directAuthError) {
        log("error", "Error with direct auth deletion, will try profile deletion", { id, error: directAuthError });
        console.error("Direct auth deletion failed, trying profile deletion:", directAuthError);
      } else {
        log("info", "Direct auth deletion successful", { id });
      }
    } catch (authError) {
      log("error", "Exception during direct auth deletion", { id, error: authError });
      console.error("Exception during direct auth deletion:", authError);
    }

    // Try profile deletion regardless of auth deletion success/failure
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);
      
    if (profileError) {
      log("error", "Error deleting profile", { id, error: profileError });
      console.error("Error deleting profile:", profileError);
      
      // If profile deletion fails, try RPC functions
      const { error: rpcError } = await supabase
        .rpc('delete_user_and_profile', { user_id: id });
        
      if (rpcError) {
        log("error", "Error deleting user via delete_user_and_profile RPC", { id, error: rpcError });
        console.error("Error deleting user via delete_user_and_profile RPC:", rpcError);
        
        // Try the other RPC function as a backup
        const { error: rpc2Error } = await supabase
          .rpc('delete_user_and_related_data', { user_id: id });
          
        if (rpc2Error) {
          log("error", "Error deleting user via delete_user_and_related_data RPC", { id, error: rpc2Error });
          console.error("Error deleting user via delete_user_and_related_data RPC:", rpc2Error);
          
          // As a last resort, try to directly execute SQL via RPC (requires a custom function)
          try {
            const { error: sqlRpcError } = await supabase
              .rpc('force_delete_user', { user_id: id });
              
            if (sqlRpcError) {
              log("error", "Error with forced user deletion via SQL RPC", { id, error: sqlRpcError });
              console.error("Forced deletion via SQL failed:", sqlRpcError);
              throw new Error(`Failed to delete user after all attempts. Manual database cleaning required.`);
            }
          } catch (finalError) {
            log("error", "All deletion methods failed", { id, error: finalError });
            console.error("All deletion methods failed:", finalError);
            throw new Error(`Não foi possível excluir o usuário após várias tentativas. Pode ser necessário excluir manualmente no console do Supabase.`);
          }
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
