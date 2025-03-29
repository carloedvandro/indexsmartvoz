
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserGroup {
  id: string;
  user_id: string;
  group_name: string;
  created_at?: string;
}

export const useUserGroups = () => {
  const { toast } = useToast();

  const fetchUserGroups = async (userId: string): Promise<string[]> => {
    try {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("user_groups")
        .select("group_name")
        .eq("user_id", userId);
      
      if (error) throw error;
      
      return data?.map(item => item.group_name) || [];
    } catch (error) {
      console.error("Error fetching user groups:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os grupos do usuário",
        variant: "destructive",
      });
      return [];
    }
  };

  const saveUserGroups = async (userId: string, groups: string[]): Promise<void> => {
    try {
      if (!userId) return;
      
      // First delete all existing groups for this user
      const { error: deleteError } = await supabase
        .from("user_groups")
        .delete()
        .eq("user_id", userId);
      
      if (deleteError) throw deleteError;
      
      // Then insert new groups
      if (groups.length > 0) {
        const groupsToInsert = groups.map(group => ({
          user_id: userId,
          group_name: group
        }));
        
        const { error: insertError } = await supabase
          .from("user_groups")
          .insert(groupsToInsert);
          
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error("Error saving user groups:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar os grupos do usuário",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    fetchUserGroups,
    saveUserGroups
  };
};
