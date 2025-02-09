
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

    // Initialize Supabase client
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
      throw new Error('Error fetching profile data');
    }

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
            content: `You are a document verification assistant. Analyze the provided ${documentType} image and extract the following information: full name, CPF number. Return only a JSON object with these fields.`
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
      }),
    });

    const aiResult = await response.json();
    
    if (!aiResult.choices?.[0]?.message?.content) {
      throw new Error('Failed to analyze document');
    }

    let extractedData;
    try {
      extractedData = JSON.parse(aiResult.choices[0].message.content);
    } catch (e) {
      console.error('Error parsing AI response:', e);
      throw new Error('Invalid AI response format');
    }

    // Compare extracted data with profile data
    const nameMatch = extractedData.full_name.toLowerCase().includes(profile.full_name.toLowerCase()) ||
                     profile.full_name.toLowerCase().includes(extractedData.full_name.toLowerCase());
    const cpfMatch = extractedData.cpf.replace(/\D/g, '') === profile.cpf.replace(/\D/g, '');

    const isVerified = nameMatch && cpfMatch;

    // Save verification result
    const { error: verificationError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: documentType,
        verification_status: isVerified ? 'completed' : 'failed',
        full_name: extractedData.full_name,
        cpf: extractedData.cpf,
        manual_verification: false
      });

    if (verificationError) {
      throw new Error('Error saving verification result');
    }

    // Update profile verification status if verified
    if (isVerified) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          document_verification_status: 'completed',
          document_validation_date: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        throw new Error('Error updating profile status');
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        verified: isVerified,
        extractedData,
        message: isVerified ? 
          'Documento verificado com sucesso' : 
          'Os dados do documento não correspondem aos dados cadastrados'
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
