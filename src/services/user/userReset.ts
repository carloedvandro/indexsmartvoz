import { supabase } from "@/integrations/supabase/client";

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/login`,
  });

  if (error) {
    throw error;
  }
};