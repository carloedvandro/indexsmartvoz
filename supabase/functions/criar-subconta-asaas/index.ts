
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

    // Verificar se é admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Acesso negado: apenas administradores podem criar subcontas' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { userId } = await req.json()

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'ID do usuário é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Buscar dados do usuário
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !userProfile) {
      return new Response(
        JSON.stringify({ error: 'Usuário não encontrado' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verificar se já tem subconta
    if (userProfile.asaas_account_id) {
      return new Response(
        JSON.stringify({ 
          error: 'Usuário já possui subconta Asaas',
          asaas_account_id: userProfile.asaas_account_id 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verificar se aceitou os termos
    const { data: termsAcceptance } = await supabase
      .from('terms_acceptance')
      .select('*')
      .eq('user_id', userId)
      .eq('accepted', true)
      .single()

    if (!termsAcceptance) {
      return new Response(
        JSON.stringify({ error: 'Usuário deve aceitar os termos antes de criar subconta' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Registrar tentativa de criação
    const { data: logEntry } = await supabase
      .from('asaas_account_logs')
      .insert({
        user_id: userId,
        creation_status: 'processing'
      })
      .select()
      .single()

    try {
      // Preparar dados para API do Asaas
      const accountData = {
        name: userProfile.full_name || 'Usuário SmartVoz',
        email: userProfile.email,
        cpfCnpj: userProfile.cpf || userProfile.cnpj,
        phone: userProfile.mobile || userProfile.phone,
        mobilePhone: userProfile.mobile,
        address: userProfile.address,
        addressNumber: '123', // Número genérico se não tiver
        complement: '',
        province: userProfile.city,
        postalCode: userProfile.zip_code,
        // Configurações específicas para subconta
        accountType: 'PAYMENT_ACCOUNT', // Tipo de conta para receber pagamentos
        companyType: userProfile.cnpj ? 'MEI' : 'INDIVIDUAL',
        site: userProfile.store_url,
      }

      console.log('Dados para criação da subconta:', accountData)

      // Chamada para API do Asaas (Sandbox)
      const asaasResponse = await fetch('https://sandbox.asaas.com/api/v3/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': Deno.env.get('ASAAS_API_KEY') || ''
        },
        body: JSON.stringify(accountData)
      })

      const asaasResult = await asaasResponse.json()
      console.log('Resposta da API Asaas:', asaasResult)

      if (!asaasResponse.ok) {
        throw new Error(`Erro na API Asaas: ${JSON.stringify(asaasResult)}`)
      }

      if (asaasResult.id && asaasResult.accessToken) {
        // Sucesso - atualizar perfil do usuário
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            asaas_account_id: asaasResult.id,
            asaas_account_token: asaasResult.accessToken,
            asaas_account_created_at: new Date().toISOString()
          })
          .eq('id', userId)

        if (updateError) {
          console.error('Erro ao atualizar perfil:', updateError)
        }

        // Atualizar log de sucesso
        await supabase
          .from('asaas_account_logs')
          .update({
            asaas_account_id: asaasResult.id,
            asaas_account_token: asaasResult.accessToken,
            creation_status: 'success'
          })
          .eq('id', logEntry.id)

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Subconta criada com sucesso',
            asaas_account_id: asaasResult.id,
            user_name: userProfile.full_name
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } else {
        throw new Error('Resposta inválida da API Asaas')
      }

    } catch (apiError) {
      console.error('Erro na criação da subconta:', apiError)
      
      // Atualizar log de erro
      await supabase
        .from('asaas_account_logs')
        .update({
          creation_status: 'error',
          error_message: apiError.message
        })
        .eq('id', logEntry.id)

      return new Response(
        JSON.stringify({
          error: 'Erro ao criar subconta no Asaas',
          details: apiError.message
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('Erro geral na função:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
