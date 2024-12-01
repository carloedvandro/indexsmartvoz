import { supabase } from "@/integrations/supabase/client";

export async function checkExistingUser(email: string) {
  const { data: existingUser, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email);

  if (error) throw error;
  return existingUser && existingUser.length > 0 ? existingUser[0] : null;
}

export async function checkExistingCnpj(cnpj: string, excludeUserId?: string) {
  const query = supabase
    .from('profiles')
    .select('id')
    .eq('cnpj', cnpj);
    
  if (excludeUserId) {
    query.neq('id', excludeUserId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data && data.length > 0;
}

export async function checkExistingDocumentId(documentId: string, excludeUserId?: string) {
  const query = supabase
    .from('profiles')
    .select('id')
    .eq('document_id', documentId);
    
  if (excludeUserId) {
    query.neq('id', excludeUserId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data && data.length > 0;
}

export async function createUser(data: any) {
  // Check for duplicate CNPJ and CPF before creating
  if (data.cnpj && await checkExistingCnpj(data.cnpj)) {
    throw new Error("Este CNPJ já está cadastrado no sistema");
  }
  
  if (data.document_id && await checkExistingDocumentId(data.document_id)) {
    throw new Error("Este CPF já está cadastrado no sistema");
  }

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
  // Check for duplicate CNPJ and CPF before updating
  if (data.cnpj && await checkExistingCnpj(data.cnpj, id)) {
    throw new Error("Este CNPJ já está cadastrado no sistema");
  }
  
  if (data.document_id && await checkExistingDocumentId(data.document_id, id)) {
    throw new Error("Este CPF já está cadastrado no sistema");
  }

  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', id);

  if (error) throw error;
}