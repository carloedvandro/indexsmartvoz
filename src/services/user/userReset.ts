
import { supabase } from "@/integrations/supabase/client";

export const resetUserPassword = async (userId: string, newPassword: string) => {
  const { data, error } = await supabase.auth.admin.updateUserById(
    userId,
    { password: newPassword }
  );

  if (error) {
    console.error("Error resetting password:", error);
    throw error;
  }

  return data;
};
