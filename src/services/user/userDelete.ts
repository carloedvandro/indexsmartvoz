
import { supabase } from "@/integrations/supabase/client";

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    console.log('Iniciando exclusão do usuário:', userId);

    // Deletar o perfil do usuário
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.error('Erro ao deletar perfil:', profileError);
      throw profileError;
    }

    console.log('Usuário deletado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return false;
  }
};
