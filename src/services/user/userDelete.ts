
import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new Error("ID do usuário é obrigatório");
  }

  log("info", "Deleting user and related data", { id });

  try {
    // Chamar a função do Supabase que lida com as exclusões em cascata
    // Passamos o nome da função e um objeto com o parâmetro user_id
    const { error } = await supabase.rpc(
      'delete_user_and_related_data', 
      { user_id: id }
    );

    if (error) {
      log("error", "Error deleting user", { id, error });
      throw error;
    }

    log("info", "User and related data deleted successfully", { id });
  } catch (error: any) {
    log("error", "Exception during user deletion", { id, error });
    throw error;
  }
};
