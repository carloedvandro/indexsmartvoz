import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export const checkExistingUser = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST204") {
    throw error;
  }

  return !!data;
};

export const checkExistingCpf = async (cpf: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("cpf", cpf)
    .single();

  if (error && error.code !== "PGRST204") {
    throw error;
  }

  return !!data;
};

export const createUser = async (data: {
  email: string;
  password: string;
  fullName: string;
  cpf: string;
  customId: string;
  sponsorCustomId?: string;
}) => {
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        custom_id: data.customId,
        cpf: data.cpf,
      },
    },
  });

  if (signUpError) throw signUpError;
  if (!authData.user) throw new Error("Failed to create user");

  return authData;
};

export const updateProfile = async (id: string, data: Partial<Profile>) => {
  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase
    .rpc('delete_user_and_profile', { user_id: id });

  if (error) {
    throw error;
  }
};