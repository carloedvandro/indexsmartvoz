import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

// Utility function for standardized logging
const log = (level: "info" | "error", message: string, data?: any) => {
  const sanitizedData = data ? JSON.parse(JSON.stringify(data, (key, value) => {
    if (key === 'password') return '[PROTECTED]';
    return value;
  })) : '';
  
  console[level](`[UserFormUtils] ${message}`, sanitizedData);
};

// Validation functions
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.length === 11 && /^\d{11}$/.test(cleanCPF);
};

export const checkExistingUser = async (email: string): Promise<boolean> => {
  if (!isValidEmail(email)) {
    throw new Error("Email inválido");
  }

  log("info", "Checking for existing user", { email });
  
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST204") {
    log("error", "Error checking existing user", error);
    throw error;
  }

  return !!data;
};

export const checkExistingCpf = async (cpf: string): Promise<boolean> => {
  if (!isValidCPF(cpf)) {
    throw new Error("CPF inválido. Deve conter 11 dígitos numéricos.");
  }

  log("info", "Checking for existing CPF", { cpf });
  
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("cpf", cpf)
    .single();

  if (error && error.code !== "PGRST204") {
    log("error", "Error checking existing CPF", error);
    throw error;
  }

  return !!data;
};

type CreateUserData = {
  email: string;
  password: string;
  fullName: string;
  cpf: string;
  customId: string;
  sponsorCustomId?: string;
};

export const createUser = async (data: CreateUserData) => {
  // Validate input data
  if (!isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }
  if (!isValidCPF(data.cpf)) {
    throw new Error("CPF inválido");
  }
  if (!data.customId || data.customId.length < 3) {
    throw new Error("ID personalizado deve ter pelo menos 3 caracteres");
  }

  log("info", "Creating new user", { 
    email: data.email, 
    fullName: data.fullName,
    customId: data.customId
  });

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
    log("error", "Error creating user", signUpError);
    throw signUpError;
  }
  
  if (!authData.user) {
    throw new Error("Falha ao criar usuário");
  }

  log("info", "User created successfully", { userId: authData.user.id });
  return authData;
};

type UpdateProfileData = Partial<{
  full_name: string;
  cpf: string;
  custom_id: string;
  store_url: string;
  email: string;
  status: string;
  document_id: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
}>;

export const updateProfile = async (id: string, data: UpdateProfileData) => {
  // Validate critical fields if present
  if (data.email && !isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }
  if (data.cpf && !isValidCPF(data.cpf)) {
    throw new Error("CPF inválido");
  }

  log("info", "Updating profile", { id, data });

  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    log("error", "Error updating profile", { id, error });
    throw error;
  }

  log("info", "Profile updated successfully", { id });
};

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new Error("ID do usuário é obrigatório");
  }

  log("info", "Deleting user", { id });

  const { error } = await supabase
    .rpc('delete_user_and_profile', { user_id: id });

  if (error) {
    log("error", "Error deleting user", { id, error });
    throw error;
  }

  log("info", "User deleted successfully", { id });
};