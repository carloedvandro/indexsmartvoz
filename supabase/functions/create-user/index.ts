import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { email, password, fullName, role } = await req.json();

    console.log('Creating user:', { email, fullName, role });

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || email.split('@')[0]
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }

    console.log('User created in auth:', authData.user.id);

    // Criar perfil do usuário
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        full_name: fullName || email.split('@')[0],
        role: role || 'client',
        status: 'active',
        active: true
      });

    if (profileError) {
      console.error('Profile error:', profileError);
      // Tentar deletar o usuário do auth se falhar ao criar perfil
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    console.log('Profile created successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: authData.user,
        message: 'Usuário criado com sucesso!' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
