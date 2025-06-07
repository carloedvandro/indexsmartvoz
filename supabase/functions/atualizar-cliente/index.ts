
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UpdateClientData {
  id: string;
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
    console.log('Updating client via Admin API...');

    // Verificar se é uma requisição PUT
    if (req.method !== 'PUT') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse do corpo da requisição
    const clientData: UpdateClientData = await req.json();
    console.log('Client update data received:', { id: clientData.id, full_name: clientData.full_name });

    // Validações básicas
    if (!clientData.id || !clientData.full_name) {
      return new Response(
        JSON.stringify({ error: 'ID e nome são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Atualizar cliente usando service role (Admin API)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Updating client profile...');

    // Preparar dados para atualização
    const updateData = {
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
      status: clientData.status,
      updated_at: new Date().toISOString()
    };

    const { data: updateResult, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('id', clientData.id)
      .select();

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
        data: updateResult,
        message: 'Cliente atualizado com sucesso'
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
