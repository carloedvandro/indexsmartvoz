
import { supabase } from "@/integrations/supabase/client";

export const fetchBillingApiData = async () => {
  // Buscar dados dos clientes ativos
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, status')
    .eq('role', 'client')
    .not('full_name', 'is', null);

  if (profilesError) throw profilesError;

  // Buscar dados das linhas de telefone (assinaturas/cobranças)
  const { data: phoneLines, error: phoneLinesError } = await supabase
    .from('phone_lines')
    .select('*');

  if (phoneLinesError) throw phoneLinesError;

  // Buscar dados de comissões da rede
  const { data: commissions, error: commissionsError } = await supabase
    .from('network_commission_history')
    .select('*');

  if (commissionsError) throw commissionsError;

  return {
    profiles: profiles || [],
    phoneLines: phoneLines || [],
    commissions: commissions || []
  };
};
