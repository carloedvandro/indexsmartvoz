
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
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Não autorizado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { aceite, receberComunicados } = await req.json()

    // Registrar aceite do termo
    const { error: insertError } = await supabase
      .from('terms_acceptance')
      .insert({
        user_id: user.id,
        accepted: aceite,
        receive_communications: receberComunicados,
        accepted_at: new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || 'unknown'
      })

    if (insertError) {
      console.error('Erro ao inserir aceite:', insertError)
      return new Response(
        JSON.stringify({ error: 'Erro ao registrar aceite' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Atualizar status no perfil do usuário
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Erro ao atualizar perfil:', updateError)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Aceite registrado com sucesso' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erro na função registro-termo:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
