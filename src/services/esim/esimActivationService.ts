
import { supabase } from "@/integrations/supabase/client";

export type ESIMActivation = {
  id: string;
  user_id: string;
  phone_number: string;
  activation_type: 'self' | 'collaborator';
  device_type: 'android' | 'ios';
  imei?: string;
  eid?: string;
  status: string;
  help_instructions?: {
    imei: string;
    eid: string;
  } | null;
  created_at?: string;
  updated_at?: string;
};

export const createESIMActivation = async (data: Omit<ESIMActivation, 'id' | 'user_id' | 'status' | 'help_instructions' | 'created_at' | 'updated_at'>) => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) throw new Error('User not authenticated');

  const { data: result, error } = await supabase
    .from('esim_activations')
    .insert({
      ...data,
      user_id: session.session.user.id,
      status: 'pending'
    })
    .select('*, help_instructions')
    .single();

  if (error) throw error;
  
  // Garantir que o tipo retornado corresponda ao ESIMActivation
  const typedResult: ESIMActivation = {
    ...result,
    activation_type: result.activation_type as 'self' | 'collaborator',
    device_type: result.device_type as 'android' | 'ios',
    help_instructions: result.help_instructions as { imei: string; eid: string; } | null
  };

  return typedResult;
};
