
import { supabase } from "@/integrations/supabase/client";
import { validatePasswordStrength } from "@/utils/passwordValidation";

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/client/update-password`,
  });

  if (error) {
    throw error;
  }
};

export const adminResetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw error;
  }
};

export const adminSetUserPassword = async (userId: string, newPassword: string) => {
  // Validate password strength first
  const validation = validatePasswordStrength(newPassword);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  // Get current admin's session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Não autenticado");
  }

  try {
    const { error } = await supabase.rpc(
      'admin_set_user_password',
      {
        admin_user_id: session.user.id,
        target_user_id: userId,
        new_password: newPassword
      }
    );

    if (error) {
      console.error('Error in adminSetUserPassword:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Error in adminSetUserPassword:', error);
    throw new Error(error.message || "Erro ao definir nova senha");
  }
};
