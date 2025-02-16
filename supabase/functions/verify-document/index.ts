
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { performOCR } from './services/ocr-service.ts';
import { 
  updateVerificationStatus, 
  createVerificationEntry,
  getProfileData,
  createDocumentVerification 
} from './services/supabase-service.ts';
import type { VerificationRequest, VerificationResponse } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, documentType, userId } = await req.json() as VerificationRequest;

    console.log('Starting enhanced document verification for user:', userId);

    // Get user profile data
    const profile = await getProfileData(userId);
    console.log('Retrieved profile data for comparison');

    // Create verification entry
    await createVerificationEntry(userId);

    // Perform OCR
    const ocrText = await performOCR(imageBase64);
    console.log('OCR Result:', ocrText);

    // Validate document data against profile
    if (!ocrText.toLowerCase().includes(profile.full_name.toLowerCase()) || 
        !ocrText.includes(profile.cpf)) {
      await updateVerificationStatus(userId, 'document_ocr', 'failed', {
        error: 'Document data does not match profile information',
        matchFound: false
      });

      return new Response(
        JSON.stringify({
          success: false,
          verified: false,
          message: 'Os dados do documento não correspondem aos dados do cadastro. Por favor, verifique e tente novamente.'
        } as VerificationResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update verification status and create document verification record
    await Promise.all([
      updateVerificationStatus(userId, 'document_ocr', 'verified', {
        matchFound: true
      }),
      createDocumentVerification(userId, documentType, profile.full_name, profile.cpf, {
        text: ocrText
      })
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        message: 'Documento verificado com sucesso'
      } as VerificationResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-document function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Erro ao verificar documento' 
      } as VerificationResponse),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
