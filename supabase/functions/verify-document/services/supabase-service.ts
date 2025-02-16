
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import type { VerificationData } from '../types.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

export async function updateVerificationStatus(
  userId: string,
  verificationType: string,
  status: string,
  verificationData: VerificationData
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

export async function createVerificationEntry(userId: string) {
  const { error } = await supabase
    .from('user_verifications')
    .insert({
      user_id: userId,
      verification_type: 'document_ocr',
      status: 'pending',
      attempt_count: 1,
      last_attempt_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating verification entry:', error);
    throw new Error('Erro ao criar registro de verificação');
  }
}

export async function getProfileData(userId: string) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, cpf')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
    throw new Error('Erro ao buscar dados do perfil');
  }

  return profile;
}

export async function createDocumentVerification(
  userId: string,
  documentType: string,
  fullName: string,
  cpf: string,
  ocrResponse: any
) {
  const { error } = await supabase
    .from('document_verifications')
    .insert({
      user_id: userId,
      document_type: documentType,
      verification_status: 'completed',
      full_name: fullName,
      cpf: cpf,
      manual_verification: false,
      background_check_status: 'pending',
      ocr_service_response: ocrResponse,
      ocr_service_type: 'ocr.space'
    });

  if (error) {
    console.error('Error creating document verification:', error);
    throw new Error('Erro ao criar verificação de documento');
  }
}
