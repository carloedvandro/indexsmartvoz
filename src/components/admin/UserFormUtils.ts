import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export const checkExistingUser = async (email: string): Promise<boolean> => {
  console.log("Checking for existing user with email:", email);
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST204") {
    console.error("Error checking existing user:", error);
    throw error;
  }

  return !!data;
};

export const checkExistingCpf = async (cpf: string): Promise<boolean> => {
  console.log("Checking for existing CPF:", cpf);
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("cpf", cpf)
    .single();

  if (error && error.code !== "PGRST204") {
    console.error("Error checking existing CPF:", error);
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
  console.log("Creating new user with data:", { ...data, password: "[REDACTED]" });
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

  if (signUpError) {
    console.error("Error creating user:", signUpError);
    throw signUpError;
  }
  if (!authData.user) throw new Error("Failed to create user");

  console.log("User created successfully:", authData.user.id);
  return authData;
};

export const updateProfile = async (id: string, data: Partial<Profile>) => {
  console.log("Updating profile for ID:", id, "with data:", data);
  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error(`Error updating profile for ID ${id}:`, error);
    throw error;
  }
  console.log("Profile updated successfully");
};

export const deleteUser = async (id: string) => {
  console.log("Deleting user with ID:", id);
  const { error } = await supabase
    .rpc('delete_user_and_profile', { user_id: id });

  if (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
  console.log("User deleted successfully");
};