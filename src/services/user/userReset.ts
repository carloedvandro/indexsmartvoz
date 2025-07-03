
import { supabase } from "@/integrations/supabase/client";

export const resetUserPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Iniciando reset de senha para:', email);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/client/update-password`,
    });

    if (error) {
      console.error('Erro no reset de senha:', error);
      return {
        success: false,
        message: 'Erro ao enviar email de recuperação. Verifique se o email está correto.'
      };
    }

    return {
      success: true,
      message: 'Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.'
    };
  } catch (error) {
    console.error('Erro inesperado no reset de senha:', error);
    return {
      success: false,
      message: 'Erro inesperado. Tente novamente mais tarde.'
    };
  }
};

export const updateUserProfile = async (userId: string, updates: any): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    return false;
  }
};
