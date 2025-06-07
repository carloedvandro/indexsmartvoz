
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

    // Aceitar POST (usado pelo supabase.functions.invoke) e PATCH
    if (req.method !== 'POST' && req.method !== 'PATCH') {
      console.error('Method not allowed:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST or PATCH for updates.' }),
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
      console.error('Missing required fields:', { id: !!clientData.id, full_name: !!clientData.full_name });
      return new Response(
        JSON.stringify({ error: 'ID e nome são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar variáveis de ambiente
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing environment variables:', { 
        hasUrl: !!supabaseUrl, 
        hasServiceKey: !!supabaseServiceKey 
      });
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Atualizar cliente usando service role (Admin API)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Updating client profile for ID:', clientData.id);

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

    console.log('Update data prepared:', updateData);

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

    if (!updateResult || updateResult.length === 0) {
      console.error('No rows affected in update for ID:', clientData.id);
      return new Response(
        JSON.stringify({ 
          error: 'Cliente não encontrado ou nenhuma alteração foi feita',
          details: { id: clientData.id }
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Profile updated successfully:', updateResult);

    // Retornar sucesso
    return new Response(
      JSON.stringify({ 
        success: true,
        data: updateResult[0],
        message: 'Cliente atualizado com sucesso'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in atualizar-cliente:', error);
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
