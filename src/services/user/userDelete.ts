import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new Error("ID do usuário é obrigatório");
  }

  log("info", "Deleting user", { id });

  const { error } = await supabase
    .rpc('delete_user_and_profile', { user_id: id });

  if (error) {
    log("error", "Error deleting user", { id, error });
    throw error;
  }

  log("info", "User deleted successfully", { id });
};