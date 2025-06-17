
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
  whatsapp?: string;
  secondary_whatsapp?: string;
  custom_id?: string;
  sponsor_id?: string;
}

serve(async (req) => {
  console.log('🚀 [CRIAR-CLIENTE] Função iniciada');
  console.log('📋 [CRIAR-CLIENTE] Método:', req.method);
  console.log('📋 [CRIAR-CLIENTE] Headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ [CRIAR-CLIENTE] Respondendo CORS preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar se é uma requisição POST
    if (req.method !== 'POST') {
      console.error('❌ [CRIAR-CLIENTE] Método não permitido:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse do corpo da requisição
    console.log('📄 [CRIAR-CLIENTE] Fazendo parse do body...');
    const body = await req.text();
    console.log('📄 [CRIAR-CLIENTE] Body completo recebido (length):', body.length);
    console.log('📄 [CRIAR-CLIENTE] Body preview:', body.substring(0, 500));
    
    const clientData: CreateClientData = JSON.parse(body);
    console.log('📋 [CRIAR-CLIENTE] Dados completos recebidos:', { 
      email: clientData.email, 
      full_name: clientData.full_name,
      cpf: clientData.cpf ? 'CPF_PRESENTE' : 'CPF_AUSENTE',
      phone: clientData.phone ? 'PHONE_PRESENTE' : 'PHONE_AUSENTE',
      mobile: clientData.mobile ? 'MOBILE_PRESENTE' : 'MOBILE_AUSENTE',
      whatsapp: clientData.whatsapp ? 'WHATSAPP_PRESENTE' : 'WHATSAPP_AUSENTE',
      address: clientData.address ? 'ADDRESS_PRESENTE' : 'ADDRESS_AUSENTE',
      custom_id: clientData.custom_id ? 'CUSTOM_ID_PRESENTE' : 'CUSTOM_ID_AUSENTE',
      sponsor_id: clientData.sponsor_id ? 'SPONSOR_PRESENTE' : 'SPONSOR_AUSENTE',
      person_type: clientData.person_type || 'NÃO_DEFINIDO'
    });

    // Validações básicas expandidas
    if (!clientData.email || !clientData.full_name) {
      console.error('❌ [CRIAR-CLIENTE] Dados obrigatórios ausentes');
      return new Response(
        JSON.stringify({ error: 'Email e nome são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar variáveis de ambiente
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('🔐 [CRIAR-CLIENTE] Variáveis de ambiente:');
    console.log('  - SUPABASE_URL:', supabaseUrl ? 'CONFIGURADA' : 'AUSENTE');
    console.log('  - SERVICE_ROLE_KEY:', serviceRoleKey ? `CONFIGURADA (${serviceRoleKey.length} chars)` : 'AUSENTE');

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('❌ [CRIAR-CLIENTE] Variáveis de ambiente não configuradas');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Criar cliente Supabase usando service role (Admin API)
    console.log('🔧 [CRIAR-CLIENTE] Criando cliente Supabase Admin...');
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Senha padrão forte
    const DEFAULT_PASSWORD = "ClienteTemp2024@#$";
    console.log('🔑 [CRIAR-CLIENTE] Senha padrão definida');

    console.log('👤 [CRIAR-CLIENTE] Criando usuário com Admin API...');

    // Preparar metadata completa do usuário
    const userMetadata = {
      full_name: clientData.full_name,
      cpf: clientData.cpf,
      custom_id: clientData.custom_id,
      phone: clientData.phone || clientData.mobile,
      whatsapp: clientData.whatsapp,
      person_type: clientData.person_type,
      sponsor_id: clientData.sponsor_id
    };

    console.log('📋 [CRIAR-CLIENTE] Metadata do usuário:', {
      full_name: userMetadata.full_name,
      has_cpf: !!userMetadata.cpf,
      has_custom_id: !!userMetadata.custom_id,
      has_phone: !!userMetadata.phone,
      has_sponsor: !!userMetadata.sponsor_id,
      person_type: userMetadata.person_type
    });

    // Criar usuário usando Admin API (não afeta sessão atual)
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: clientData.email,
      password: DEFAULT_PASSWORD,
      email_confirm: true, // Confirma email automaticamente
      user_metadata: userMetadata
    });

    if (createError) {
      console.error('❌ [CRIAR-CLIENTE] Erro ao criar usuário:', createError);
      console.error('❌ [CRIAR-CLIENTE] Detalhes do erro:', {
        message: createError.message,
        status: createError.status,
        name: createError.name
      });
      return new Response(
        JSON.stringify({ 
          error: `Erro ao criar usuário: ${createError.message}`,
          details: createError,
          debug_info: {
            email: clientData.email,
            has_full_name: !!clientData.full_name
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!userData || !userData.user) {
      console.error('❌ [CRIAR-CLIENTE] Usuário não foi criado - dados não retornados');
      return new Response(
        JSON.stringify({ error: 'Erro ao criar usuário - dados não retornados' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ [CRIAR-CLIENTE] Usuário criado com sucesso:', userData.user.id);

    // Atualizar o perfil com TODOS os dados completos
    console.log('📝 [CRIAR-CLIENTE] Atualizando perfil com dados completos...');
    const profileData = {
      full_name: clientData.full_name,
      cpf: clientData.cpf,
      phone: clientData.phone,
      mobile: clientData.mobile,
      whatsapp: clientData.whatsapp,
      secondary_whatsapp: clientData.secondary_whatsapp,
      birth_date: clientData.birth_date || null,
      person_type: clientData.person_type,
      document_id: clientData.document_id,
      cnpj: clientData.cnpj || null,
      address: clientData.address,
      city: clientData.city,
      state: clientData.state,
      country: clientData.country || 'Brasil',
      zip_code: clientData.zip_code,
      gender: clientData.gender,
      civil_status: clientData.civil_status,
      status: 'active',
      role: 'client',
      custom_id: clientData.custom_id,
      store_url: clientData.custom_id,
      sponsor_id: clientData.sponsor_id
    };

    console.log('📝 [CRIAR-CLIENTE] Dados completos do perfil a serem atualizados:', {
      user_id: userData.user.id,
      has_cpf: !!profileData.cpf,
      has_phone: !!profileData.phone,
      has_mobile: !!profileData.mobile,
      has_whatsapp: !!profileData.whatsapp,
      has_address: !!profileData.address,
      has_custom_id: !!profileData.custom_id,
      has_sponsor: !!profileData.sponsor_id,
      person_type: profileData.person_type,
      country: profileData.country
    });

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update(profileData)
      .eq('id', userData.user.id);

    if (profileError) {
      console.error('❌ [CRIAR-CLIENTE] Erro ao atualizar perfil:', profileError);
      console.error('❌ [CRIAR-CLIENTE] Detalhes do erro do perfil:', {
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
        code: profileError.code
      });
      return new Response(
        JSON.stringify({ 
          error: `Erro ao atualizar perfil: ${profileError.message}`,
          details: profileError,
          debug_info: {
            user_id: userData.user.id,
            profile_data: profileData
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ [CRIAR-CLIENTE] Perfil atualizado com sucesso');

    // Retornar sucesso com dados completos
    const successResponse = { 
      success: true,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        full_name: clientData.full_name,
        custom_id: clientData.custom_id,
        cpf: clientData.cpf,
        phone: clientData.phone || clientData.mobile,
        whatsapp: clientData.whatsapp
      },
      message: 'Cliente criado com sucesso',
      defaultPassword: DEFAULT_PASSWORD
    };

    console.log('🎉 [CRIAR-CLIENTE] Sucesso! Retornando resposta completa:', {
      user_id: userData.user.id,
      email: userData.user.email,
      has_custom_id: !!clientData.custom_id,
      has_cpf: !!clientData.cpf
    });

    return new Response(
      JSON.stringify(successResponse),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('💥 [CRIAR-CLIENTE] Erro inesperado:', error);
    console.error('💥 [CRIAR-CLIENTE] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    console.error('💥 [CRIAR-CLIENTE] Tipo do erro:', typeof error);
    console.error('💥 [CRIAR-CLIENTE] Nome do erro:', error instanceof Error ? error.name : 'N/A');
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : String(error),
        debug_info: {
          error_type: typeof error,
          error_name: error instanceof Error ? error.name : 'Unknown',
          timestamp: new Date().toISOString()
        }
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
