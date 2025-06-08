
import { supabase } from "@/integrations/supabase/client";

export const fetchBillingData = async () => {
  console.log('📊 fetchBillingData: Iniciando');

  // Buscar dados dos clientes ativos
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, status')
    .eq('role', 'client')
    .not('full_name', 'is', null);

  console.log('👥 fetchBillingData: Profiles fetched:', profiles?.length || 0, 'profiles');
  if (profilesError) {
    console.error('❌ fetchBillingData: Erro ao buscar perfis:', profilesError);
  }

  // Buscar dados das linhas de telefone (assinaturas/cobranças)
  const { data: phoneLines, error: phoneLinesError } = await supabase
    .from('phone_lines')
    .select('*');

  console.log('📞 fetchBillingData: Phone lines fetched:', phoneLines?.length || 0, 'lines');
  if (phoneLinesError) {
    console.error('❌ fetchBillingData: Erro ao buscar linhas:', phoneLinesError);
  }

  // Buscar dados de comissões da rede
  const { data: commissions, error: commissionsError } = await supabase
    .from('network_commission_history')
    .select('*');

  console.log('💰 fetchBillingData: Commissions fetched:', commissions?.length || 0, 'commissions');
  if (commissionsError) {
    console.error('❌ fetchBillingData: Erro ao buscar comissões:', commissionsError);
  }

  return {
    profiles: profiles || [],
    phoneLines: phoneLines || [],
    commissions: commissions || []
  };
};
