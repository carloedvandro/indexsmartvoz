
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

  // Simulação temporária (substitua pela lógica real quando a tabela for criada)
  const mockResult: ESIMActivation = {
    id: crypto.randomUUID(),
    user_id: session.session.user.id,
    activation_type: data.activation_type,
    device_type: data.device_type,
    phone_number: data.phone_number,
    imei: data.imei,
    eid: data.eid,
    status: 'pending',
    help_instructions: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return mockResult;
};
