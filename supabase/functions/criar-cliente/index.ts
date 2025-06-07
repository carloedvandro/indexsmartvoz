
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreateClientData {
  email: string;
  full_name: string;
  cpf: string;
  phone: string;
  mobile: string;
  birth_date: string;
  person_type: string;
  document_id: string;
  cnpj?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  gender: string;
  civil_status: string;
  status: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating client via Admin API...');

    // Verificar se é uma requisição POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse do corpo da requisição
    const clientData: CreateClientData = await req.json();
    console.log('Client data received:', { email: clientData.email, full_name: clientData.full_name });

    // Validações básicas
    if (!clientData.email || !clientData.full_name) {
      return new Response(
        JSON.stringify({ error: 'Email e nome são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Criar cliente Supabase usando service role (Admin API)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Senha padrão forte
    const DEFAULT_PASSWORD = "ClienteTemp2024@#$";

    console.log('Creating user with Admin API...');

    // Criar usuário usando Admin API (não afeta sessão atual)
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: clientData.email,
      password: DEFAULT_PASSWORD,
      email_confirm: true, // Confirma email automaticamente
      user_metadata: {
        full_name: clientData.full_name,
      }
    });

    if (createError) {
      console.error('Error creating user with Admin API:', createError);
      return new Response(
        JSON.stringify({ 
          error: `Erro ao criar usuário: ${createError.message}`,
          details: createError
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!userData.user) {
      return new Response(
        JSON.stringify({ error: 'Erro ao criar usuário - dados não retornados' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('User created successfully with ID:', userData.user.id);

    // Atualizar o perfil com os dados completos
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name: clientData.full_name,
        cpf: clientData.cpf,
        phone: clientData.phone,
        mobile: clientData.mobile,
        birth_date: clientData.birth_date || null,
        person_type: clientData.person_type,
        document_id: clientData.document_id,
        cnpj: clientData.cnpj || null,
        address: clientData.address,
        city: clientData.city,
        state: clientData.state,
        country: clientData.country,
        zip_code: clientData.zip_code,
        gender: clientData.gender,
        civil_status: clientData.civil_status,
        status: 'active',
        role: 'client'
      })
      .eq('id', userData.user.id);

    if (profileError) {
      console.error('Profile update error:', profileError);
      return new Response(
        JSON.stringify({ 
          error: `Erro ao atualizar perfil: ${profileError.message}`,
          details: profileError
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Profile updated successfully');

    // Retornar sucesso
    return new Response(
      JSON.stringify({ 
        success: true,
        user: {
          id: userData.user.id,
          email: userData.user.email,
        },
        message: 'Cliente criado com sucesso',
        defaultPassword: DEFAULT_PASSWORD
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
