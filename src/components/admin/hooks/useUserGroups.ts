
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserGroups = () => {
  const { toast } = useToast();
  
  const saveUserGroups = async (userId: string, groups: string[]) => {
    try {
      // First, create the RPC function if it doesn't exist (would normally be in a migration)
      await createRpcFunctionIfNeeded();
      
      // Call the RPC function to save user groups
      const { error } = await supabase.rpc(
        'save_user_groups',
        { user_id: userId, group_names: groups }
      );
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error saving user groups:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar grupos do usuário",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const createRpcFunctionIfNeeded = async () => {
    // This would normally be in a Supabase migration
    // We're adding it here since we don't have control over migrations in this context
    try {
      await supabase.rpc('get_user_groups', { user_id: '00000000-0000-0000-0000-000000000000' });
    } catch (error: any) {
      if (error.message.includes('function get_user_groups') && error.message.includes('does not exist')) {
        // Create the user_groups table if it doesn't exist
        await supabase.rpc('create_user_groups_table_if_needed');
        
        // Create the functions if they don't exist
        await supabase.rpc('create_user_groups_functions');
      }
    }
  };

  return { saveUserGroups };
};
