
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { createWorker } from 'https://esm.sh/tesseract.js@5.0.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, documentType, userId } = await req.json();

    console.log('Starting document verification for user:', userId);

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

    // Initialize Tesseract worker
    const worker = await createWorker('por');
    
    try {
      // Recognize text from image
      const result = await worker.recognize(`data:image/jpeg;base64,${imageBase64}`);
      console.log('OCR Result:', result.data.text);

      // Normalize strings for comparison (remove spaces, special chars, etc)
      const normalizeString = (str: string) => 
        str.toLowerCase()
           .normalize('NFD')
           .replace(/[\u0300-\u036f]/g, '')
           .replace(/[^a-z0-9]/g, '');

      const normalizedProfileName = normalizeString(profile.full_name);
      const normalizedProfileCPF = normalizeString(profile.cpf);

      // Extract CPF pattern (11 digits)
      const cpfPattern = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g;
      const extractedCPF = result.data.text.match(cpfPattern)?.[0];

      if (!extractedCPF) {
        console.log('No CPF found in document');
        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            message: 'CPF não encontrado no documento'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedExtractedCPF = normalizeString(extractedCPF);

      // Search for the full name in the OCR text
      const words = result.data.text.split('\n').join(' ').split(' ');
      let foundName = '';
      let maxMatchingWords = 0;

      const profileNameWords = profile.full_name.split(' ');

      // Try to find the longest sequence of matching words
      for (let i = 0; i < words.length; i++) {
        for (let j = i; j < words.length; j++) {
          const candidateName = words.slice(i, j + 1).join(' ');
          const normalizedCandidate = normalizeString(candidateName);
          
          if (normalizedProfileName.includes(normalizedCandidate) && 
              candidateName.split(' ').length > maxMatchingWords) {
            foundName = candidateName;
            maxMatchingWords = candidateName.split(' ').length;
          }
        }
      }

      const nameMatch = maxMatchingWords >= profileNameWords.length * 0.7; // 70% match threshold
      const cpfMatch = normalizedExtractedCPF === normalizedProfileCPF;

      console.log('Verification results:', {
        nameMatch,
        cpfMatch,
        foundName,
        extractedCPF,
        maxMatchingWords,
        profileNameWords: profileNameWords.length
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

      // Save verification result
      const { error: verificationError } = await supabase
        .from('document_verifications')
        .insert({
          user_id: userId,
          document_type: documentType,
          verification_status: 'completed',
          full_name: foundName,
          cpf: extractedCPF,
          manual_verification: false
        });

      if (verificationError) {
        console.error('Error saving verification:', verificationError);
        throw new Error('Erro ao salvar verificação');
      }

      await worker.terminate();

      return new Response(
        JSON.stringify({
          success: true,
          verified: true,
          message: 'Documento verificado com sucesso'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      console.error('Error in OCR processing:', error);
      await worker.terminate();
      throw error;
    }

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
