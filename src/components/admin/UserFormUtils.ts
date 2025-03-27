
import { supabase } from "@/integrations/supabase/client";

// Check if user with email already exists
export const checkExistingUser = async (email: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();
  
  return data;
};

// Check if user with CPF already exists
export const checkExistingCpf = async (cpf: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("cpf", cpf)
    .single();
  
  return data;
};

// Create a new user with email and password
export const createUser = async (userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password || "changeme123",
    options: {
      data: {
        full_name: userData.full_name,
      },
    },
  });

  if (error) throw error;
  return data;
};

// Update user profile
export const updateProfile = async (userId: string, userData: any) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: userData.full_name,
      email: userData.email,
      phone: userData.phone,
      mobile: userData.mobile,
      birth_date: userData.birth_date,
      cpf: userData.cpf,
      document_id: userData.document_id,
      cnpj: userData.cnpj,
      external_id: userData.external_id,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      country: userData.country,
      zip_code: userData.zip_code,
      gender: userData.gender,
      civil_status: userData.civil_status,
      status: userData.status,
      role: userData.role
    })
    .eq("id", userId);

  if (error) throw error;
};

// Delete user
export const deleteUser = async (userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
};

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
