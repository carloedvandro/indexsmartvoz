
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserGroups = () => {
  const { toast } = useToast();
  
  const saveUserGroups = async (userId: string, groups: string[]) => {
    try {
      // Delete existing groups for this user
      await supabase
        .from("user_groups")
        .delete()
        .eq("user_id", userId);

      // Insert new groups
      if (groups.length > 0) {
        const groupsToInsert = groups.map(group => ({
          user_id: userId,
          group_name: group
        }));
        
        const { error } = await supabase
          .from("user_groups")
          .insert(groupsToInsert);
          
        if (error) throw error;
      }
      
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

  return { saveUserGroups };
};
