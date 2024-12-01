import { supabase } from "@/integrations/supabase/client";

export async function checkExistingUser(email: string) {
  const { data: existingUser, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email);

  if (error) throw error;
  return existingUser && existingUser.length > 0 ? existingUser[0] : null;
}

export async function createUser(data: any) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: "changeme123",
    options: {
      data: {
        full_name: data.full_name,
      },
    },
  });

  if (authError) throw authError;
  return authData;
}

export async function updateProfile(id: string, data: any) {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', id);

  if (error) throw error;
}