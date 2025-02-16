
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
};

export const createESIMActivation = async (data: Omit<ESIMActivation, 'id' | 'user_id' | 'status'>) => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) throw new Error('User not authenticated');

  const { data: result, error } = await supabase
    .from('esim_activations')
    .insert({
      ...data,
      user_id: session.session.user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return result;
};
