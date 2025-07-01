
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
    console.log('📄 [CRIAR-CLIENTE] Body recebido (length):', body.length);
    
    const clientData: CreateClientData = JSON.parse(body);
    console.log('📋 [CRIAR-CLIENTE] Dados recebidos:', { 
      email: clientData.email, 
      full_name: clientData.full_name,
      cpf: clientData.cpf ? 'CPF_PRESENTE' : 'CPF_AUSENTE',
      custom_id: clientData.custom_id ? 'CUSTOM_ID_PRESENTE' : 'CUSTOM_ID_AUSENTE',
      sponsor_id: clientData.sponsor_id ? 'SPONSOR_PRESENTE' : 'SPONSOR_AUSENTE',
    });

    // Validações básicas
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
    console.log('  - SERVICE_ROLE_KEY:', serviceRoleKey ? 'CONFIGURADA' : 'AUSENTE');

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

    console.log('📋 [CRIAR-CLIENTE] Metadata do usuário preparada');

    // Criar usuário usando Admin API (não afeta sessão atual)
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: clientData.email,
      password: DEFAULT_PASSWORD,
      email_confirm: true, // Confirma email automaticamente
      user_metadata: userMetadata
    });

    if (createError) {
      console.error('❌ [CRIAR-CLIENTE] Erro ao criar usuário:', createError);
      return new Response(
        JSON.stringify({ 
          error: `Erro ao criar usuário: ${createError.message}`,
          details: createError,
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

    const userId = userData.user.id;
    console.log('✅ [CRIAR-CLIENTE] Usuário criado com sucesso:', userId);

    // IMPORTANTE: Aguardar um pouco para garantir que o trigger do profile foi executado
    console.log('⏱️ [CRIAR-CLIENTE] Aguardando criação automática do profile...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verificar se o profile foi criado automaticamente pelo trigger
    console.log('🔍 [CRIAR-CLIENTE] Verificando se profile existe...');
    const { data: existingProfile, error: checkError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ [CRIAR-CLIENTE] Erro ao verificar profile:', checkError);
      return new Response(
        JSON.stringify({ 
          error: `Erro ao verificar profile: ${checkError.message}`,
          details: checkError 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Se o profile não existe, criar manualmente
    if (!existingProfile) {
      console.log('📝 [CRIAR-CLIENTE] Profile não encontrado, criando manualmente...');
      const { error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userId,
          email: clientData.email,
          full_name: clientData.full_name,
          role: 'client',
          status: 'active'
        });

      if (insertError) {
        console.error('❌ [CRIAR-CLIENTE] Erro ao criar profile manualmente:', insertError);
        return new Response(
          JSON.stringify({ 
            error: `Erro ao criar profile: ${insertError.message}`,
            details: insertError 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      console.log('✅ [CRIAR-CLIENTE] Profile criado manualmente');
    } else {
      console.log('✅ [CRIAR-CLIENTE] Profile já existe');
    }

    // Atualizar o perfil com dados completos
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

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update(profileData)
      .eq('id', userId);

    if (profileError) {
      console.error('❌ [CRIAR-CLIENTE] Erro ao atualizar perfil:', profileError);
      return new Response(
        JSON.stringify({ 
          error: `Erro ao atualizar perfil: ${profileError.message}`,
          details: profileError,
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ [CRIAR-CLIENTE] Perfil atualizado com sucesso');

    // Agora inserir o endereço usando o user_id que sabemos que existe
    console.log('🏠 [CRIAR-CLIENTE] Inserindo endereço...');
    const addressData = {
      user_id: userId,
      cep: clientData.zip_code,
      street: clientData.address.split(',')[0]?.trim() || clientData.address,
      neighborhood: '', // Será necessário ajustar se tiver esse campo
      number: '', // Será necessário ajustar se tiver esse campo  
      city: clientData.city,
      state: clientData.state,
      complement: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('🏠 [CRIAR-CLIENTE] Dados do endereço:', {
      user_id: addressData.user_id,
      cep: addressData.cep,
      city: addressData.city,
      state: addressData.state
    });

    const { error: addressError } = await supabaseAdmin
      .from('user_addresses')
      .insert(addressData);

    if (addressError) {
      console.error('❌ [CRIAR-CLIENTE] Erro ao inserir endereço:', addressError);
      return new Response(
        JSON.stringify({ 
          error: `Erro ao inserir endereço: ${addressError.message}`,
          details: addressError,
          debug_info: {
            user_id: userId,
            address_data: addressData
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ [CRIAR-CLIENTE] Endereço inserido com sucesso');

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

    console.log('🎉 [CRIAR-CLIENTE] Sucesso! Cliente criado completamente');

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
