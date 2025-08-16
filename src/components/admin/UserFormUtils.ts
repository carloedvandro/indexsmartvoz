
import { supabase } from "@/integrations/supabase/client";

export const checkExistingUser = async (email: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();
  return data;
};

export const createUser = async (userData: any) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password || 'temp123456',
    email_confirm: true,
  });
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (profileId: string, profileData: any) => {
  const { error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', profileId);
  
  if (error) throw error;
};

export const deleteUser = async (userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
};

export const adminResetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const adminSetUserPassword = async (userId: string, password: string) => {
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: password
  });
  if (error) throw error;
};
