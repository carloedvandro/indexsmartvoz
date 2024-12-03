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

export async function checkExistingCpf(cpf: string | null, excludeUserId?: string) {
  if (!cpf?.trim()) {
    return false;
  }

  const query = supabase
    .from('profiles')
    .select('id')
    .eq('cpf', cpf.trim());
    
  if (excludeUserId) {
    query.neq('id', excludeUserId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data && data.length > 0;
}

export async function createUser(data: any, isAdmin: boolean = false) {
  const cleanData = {
    ...data,
    cnpj: data.cnpj?.trim() || null,
    cpf: data.cpf?.trim() || null,
    document_id: data.document_id?.trim() || null
  };

  if (cleanData.cnpj && await checkExistingCnpj(cleanData.cnpj)) {
    throw new Error("Este CNPJ já está cadastrado no sistema");
  }
  
  if (cleanData.cpf && await checkExistingCpf(cleanData.cpf)) {
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

  if (isAdmin && authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', authData.user.id);

    if (profileError) throw profileError;
  }

  return authData;
}

export async function updateProfile(id: string, data: any) {
  const cleanData = {
    ...data,
    cnpj: data.cnpj?.trim() || null,
    cpf: data.cpf?.trim() || null,
    document_id: data.document_id?.trim() || null
  };

  if (cleanData.cnpj && await checkExistingCnpj(cleanData.cnpj, id)) {
    throw new Error("Este CNPJ já está cadastrado no sistema");
  }
  
  if (cleanData.cpf && await checkExistingCpf(cleanData.cpf, id)) {
    throw new Error("Este CPF já está cadastrado no sistema");
  }

  const { error } = await supabase
    .from('profiles')
    .update(cleanData)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteUser(userId: string) {
  // Primeiro, verificar se o usuário que está tentando deletar é um admin
  const { data: adminCheck, error: adminError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .single();

  if (adminError) throw adminError;
  if (adminCheck?.role !== 'admin') {
    throw new Error("Apenas administradores podem excluir usuários");
  }

  // Agora podemos chamar a função RPC que deleta o usuário e seu perfil
  const { error } = await supabase.rpc('delete_user_and_profile', {
    user_id: userId
  });

  if (error) {
    console.error('Error deleting user:', error);
    throw new Error("Erro ao excluir usuário. Por favor, tente novamente.");
  }
}