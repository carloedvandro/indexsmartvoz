
import { supabase } from "@/integrations/supabase/client";

// Admin reset password (sends email)
export const adminResetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/update-password`,
  });
  
  if (error) throw error;
};

// Admin set password directly
export const adminSetUserPassword = async (userId: string, password: string) => {
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password,
  });
  
  if (error) throw error;
};
