
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, documentType, userId } = await req.json();

    console.log('Starting document verification for user:', userId);

    // Get registration data from the session
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user profile data for comparison
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, cpf')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Erro ao buscar dados do perfil');
    }

    console.log('Retrieved profile data for comparison');

    // Call OpenAI API to analyze the document
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a strict document verification assistant. Analyze the provided ${documentType.toUpperCase()} image and extract the following information EXACTLY as it appears:
            - full name
            - CPF number
            Format your response as a JSON object with these fields. Be VERY strict in your verification - the data must match EXACTLY.
            If the image is blurry, incomplete, or you cannot read the information clearly, return an error.
            If you cannot find both the full name and CPF, return an error.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      throw new Error('Erro na análise do documento');
    }

    const aiResult = await response.json();
    console.log('AI response received');
    
    if (!aiResult.choices?.[0]?.message?.content) {
      console.error('Invalid AI response format:', aiResult);
      throw new Error('Formato de resposta inválido da IA');
    }

    let extractedData;
    try {
      extractedData = JSON.parse(aiResult.choices[0].message.content);
      console.log('Extracted data:', {
        extracted_name: extractedData.full_name,
        extracted_cpf: extractedData.cpf,
        profile_name: profile.full_name,
        profile_cpf: profile.cpf
      });
    } catch (e) {
      console.error('Error parsing AI response:', e);
      throw new Error('Erro ao processar resposta da IA');
    }

    if (!extractedData.full_name || !extractedData.cpf) {
      throw new Error('Não foi possível identificar nome completo e CPF no documento');
    }

    // Normalize strings for comparison (remove spaces, special chars, etc)
    const normalizeString = (str: string) => 
      str.toLowerCase()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .replace(/[^a-z0-9]/g, '');

    const normalizedExtractedName = normalizeString(extractedData.full_name);
    const normalizedProfileName = normalizeString(profile.full_name);
    const normalizedExtractedCPF = normalizeString(extractedData.cpf);
    const normalizedProfileCPF = normalizeString(profile.cpf);

    console.log('Comparing normalized data:', {
      normalized_extracted_name: normalizedExtractedName,
      normalized_profile_name: normalizedProfileName,
      normalized_extracted_cpf: normalizedExtractedCPF,
      normalized_profile_cpf: normalizedProfileCPF
    });

    const nameMatch = normalizedExtractedName === normalizedProfileName;
    const cpfMatch = normalizedExtractedCPF === normalizedProfileCPF;

    // Detailed validation results
    console.log('Validation results:', {
      nameMatch,
      cpfMatch,
      nameLength: {
        extracted: normalizedExtractedName.length,
        profile: normalizedProfileName.length
      },
      cpfLength: {
        extracted: normalizedExtractedCPF.length,
        profile: normalizedProfileCPF.length
      }
    });

    if (!nameMatch || !cpfMatch) {
      let errorDetails = [];
      if (!nameMatch) errorDetails.push('O nome no documento não corresponde ao cadastro');
      if (!cpfMatch) errorDetails.push('O CPF no documento não corresponde ao cadastro');
      
      const errorMessage = errorDetails.join('. ');
      console.log('Verification failed:', errorMessage);
      
      return new Response(
        JSON.stringify({
          success: false,
          verified: false,
          message: errorMessage
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Document verification successful');

    // Save verification result
    const { error: verificationError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: documentType,
        verification_status: 'completed',
        full_name: extractedData.full_name,
        cpf: extractedData.cpf,
        manual_verification: false
      });

    if (verificationError) {
      console.error('Error saving verification:', verificationError);
      throw new Error('Erro ao salvar verificação');
    }

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        message: 'Documento verificado com sucesso'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-document function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Erro ao verificar documento' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
