
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

    console.log('Starting enhanced document verification for user:', userId);

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

    // Create verification entry
    const { error: verificationError } = await supabase
      .from('user_verifications')
      .insert({
        user_id: userId,
        verification_type: 'document_ocr',
        status: 'pending',
        attempt_count: 1,
        last_attempt_at: new Date().toISOString(),
      });

    if (verificationError) {
      console.error('Error creating verification entry:', verificationError);
      throw new Error('Erro ao criar registro de verificação');
    }

    // Initialize Tesseract worker with Portuguese language
    const worker = await createWorker('por');
    
    try {
      // Enhanced OCR settings for better accuracy
      const result = await worker.recognize(`data:image/jpeg;base64,${imageBase64}`, {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,- ',
        tessjs_create_pdf: '1',
        tessjs_pdf_name: 'ocr_result',
        tessjs_create_hocr: '1',
        tessedit_pageseg_mode: '1',
        tessedit_ocr_engine_mode: '2',
      });
      
      console.log('Enhanced OCR Result:', result.data.text);

      // Normalize strings for comparison with improved algorithm
      const normalizeString = (str: string) => 
        str.toLowerCase()
           .normalize('NFD')
           .replace(/[\u0300-\u036f]/g, '')
           .replace(/[^a-z0-9]/g, '')
           .trim();

      const normalizedProfileName = normalizeString(profile.full_name);
      const normalizedProfileCPF = normalizeString(profile.cpf);

      // Enhanced CPF pattern matching
      const cpfPattern = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g;
      const extractedCPFs = result.data.text.match(cpfPattern);

      if (!extractedCPFs || extractedCPFs.length === 0) {
        console.log('No CPF found in document');
        await updateVerificationStatus(supabase, userId, 'document_ocr', 'failed', {
          error: 'CPF não encontrado no documento'
        });
        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            message: 'CPF não encontrado no documento. Por favor, certifique-se que o documento está legível e tente novamente.'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Enhanced CPF validation with exact match requirement
      let cpfMatch = false;
      for (const cpf of extractedCPFs) {
        if (normalizeString(cpf) === normalizedProfileCPF) {
          cpfMatch = true;
          break;
        }
      }

      if (!cpfMatch) {
        console.log('CPF mismatch:', {
          extracted: extractedCPFs,
          profile: normalizedProfileCPF
        });
        await updateVerificationStatus(supabase, userId, 'document_ocr', 'failed', {
          error: 'CPF não corresponde'
        });
        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            message: 'O CPF no documento não corresponde ao cadastro.'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Enhanced name matching algorithm
      const words = result.data.text
        .split('\n')
        .join(' ')
        .split(' ')
        .filter(word => word.length > 1) // Remove single characters
        .map(word => normalizeString(word));

      const profileNameWords = normalizedProfileName.split(' ');
      
      // Calculate name match score using improved algorithm
      let matchedWords = 0;
      let foundNameParts: string[] = [];

      for (const nameWord of profileNameWords) {
        if (nameWord.length <= 2) continue; // Skip very short words
        
        const found = words.some(word => {
          const similarity = calculateStringSimilarity(word, nameWord);
          return similarity >= 0.85; // 85% similarity threshold
        });
        
        if (found) {
          matchedWords++;
          foundNameParts.push(nameWord);
        }
      }

      const nameMatchScore = matchedWords / profileNameWords.filter(w => w.length > 2).length;
      const nameMatchThreshold = 0.85; // Require 85% match

      console.log('Name match analysis:', {
        score: nameMatchScore,
        threshold: nameMatchThreshold,
        matchedWords,
        totalWords: profileNameWords.length,
        foundParts: foundNameParts
      });

      if (nameMatchScore < nameMatchThreshold) {
        await updateVerificationStatus(supabase, userId, 'document_ocr', 'failed', {
          error: 'Nome não corresponde',
          score: nameMatchScore
        });
        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            message: 'O nome no documento não corresponde ao cadastro. Por favor, certifique-se que o documento está legível e tente novamente.'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update verification status and document verification record
      await Promise.all([
        updateVerificationStatus(supabase, userId, 'document_ocr', 'verified', {
          nameMatchScore,
          cpfMatch: true
        }),
        supabase
          .from('document_verifications')
          .insert({
            user_id: userId,
            document_type: documentType,
            verification_status: 'completed',
            full_name: profile.full_name,
            cpf: extractedCPFs[0],
            manual_verification: false,
            background_check_status: 'pending'
          })
      ]);

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

// Helper function to calculate string similarity using Levenshtein distance
function calculateStringSimilarity(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  const distance = track[str2.length][str1.length];
  return 1 - distance / Math.max(str1.length, str2.length);
}

// Helper function to update verification status
async function updateVerificationStatus(
  supabase: any,
  userId: string,
  verificationType: string,
  status: string,
  verificationData: any
) {
  const { error } = await supabase
    .from('user_verifications')
    .update({
      status,
      verification_data: verificationData,
      verified_at: status === 'verified' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .eq('verification_type', verificationType);

  if (error) {
    console.error('Error updating verification status:', error);
  }
}
