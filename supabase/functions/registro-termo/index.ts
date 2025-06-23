
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Iniciando função registro-termo');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Verificar autenticação
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('❌ Header de autorização não encontrado');
      return new Response(
        JSON.stringify({ error: 'Header de autorização necessário' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    console.log('🔑 Token extraído, verificando usuário...');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError) {
      console.error('❌ Erro de autenticação:', authError);
      return new Response(
        JSON.stringify({ error: 'Erro de autenticação: ' + authError.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!user) {
      console.error('❌ Usuário não encontrado');
      return new Response(
        JSON.stringify({ error: 'Usuário não encontrado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ Usuário autenticado:', user.id);

    const requestBody = await req.json()
    const { aceite, receberComunicados } = requestBody

    console.log('📝 Dados recebidos:', { aceite, receberComunicados });

    // Usar a tabela terms_acceptance correta
    console.log('💾 Inserindo aceite na tabela terms_acceptance...');
    
    const { error: insertError } = await supabase
      .from('terms_acceptance')
      .upsert({
        user_id: user.id,
        accepted: aceite,
        receive_communications: receberComunicados,
        accepted_at: new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || 'unknown'
      }, {
        onConflict: 'user_id'
      })

    if (insertError) {
      console.error('❌ Erro ao inserir aceite:', insertError);
      return new Response(
        JSON.stringify({ 
          error: 'Erro ao registrar aceite', 
          details: insertError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ Aceite registrado com sucesso');

    return new Response(
      JSON.stringify({ success: true, message: 'Aceite registrado com sucesso' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ Erro na função registro-termo:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
