import { supabase } from "@/integrations/supabase/client";

export async function checkExistingUser(email: string) {
  const { data: existingUser, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email);

  if (error) throw error;
  return existingUser && existingUser.length > 0 ? existingUser[0] : null;
}

export async function checkExistingCnpj(cnpj: string | null, excludeUserId?: string) {
  // If CNPJ is empty or null, consider it as not duplicate
  if (!cnpj?.trim()) {
    return false;
  }

  const query = supabase
    .from('profiles')
    .select('id')
    .eq('cnpj', cnpj.trim());
    
  if (excludeUserId) {
    query.neq('id', excludeUserId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data && data.length > 0;
}

export async function checkExistingDocumentId(documentId: string | null, excludeUserId?: string) {
  // If document ID is empty or null, consider it as not duplicate
  if (!documentId?.trim()) {
    return false;
  }

  const query = supabase
    .from('profiles')
    .select('id')
    .eq('document_id', documentId.trim());
    
  if (excludeUserId) {
    query.neq('id', excludeUserId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data && data.length > 0;
}

export async function createUser(data: any) {
  // Clean up CNPJ and document_id before checking
  const cleanData = {
    ...data,
    cnpj: data.cnpj?.trim() || null,
    document_id: data.document_id?.trim() || null
  };

  // Check for duplicate CNPJ and CPF before creating
  if (cleanData.cnpj && await checkExistingCnpj(cleanData.cnpj)) {
    throw new Error("Este CNPJ já está cadastrado no sistema");
  }
  
  if (cleanData.document_id && await checkExistingDocumentId(cleanData.document_id)) {
    throw new Error("Este CPF já está cadastrado no sistema");
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: cleanData.email,
    password: "changeme123",
    options: {
      data: {
        full_name: cleanData.full_name,
      },
    },
  });

  if (authError) throw authError;
  return authData;
}

export async function updateProfile(id: string, data: any) {
  // Clean up CNPJ and document_id before checking
  const cleanData = {
    ...data,
    cnpj: data.cnpj?.trim() || null,
    document_id: data.document_id?.trim() || null
  };

  // Check for duplicate CNPJ and CPF before updating
  if (cleanData.cnpj && await checkExistingCnpj(cleanData.cnpj, id)) {
    throw new Error("Este CNPJ já está cadastrado no sistema");
  }
  
  if (cleanData.document_id && await checkExistingDocumentId(cleanData.document_id, id)) {
    throw new Error("Este CPF já está cadastrado no sistema");
  }

  const { error } = await supabase
    .from('profiles')
    .update(cleanData)
    .eq('id', id);

  if (error) throw error;
}