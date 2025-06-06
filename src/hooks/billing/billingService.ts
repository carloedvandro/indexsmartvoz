
import { supabase } from "@/integrations/supabase/client";

export const billingService = {
  async fetchProfiles() {
    console.log('📊 billingService: Fetching profiles');
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, status')
      .eq('role', 'client')
      .not('full_name', 'is', null);

    console.log('👥 billingService: Profiles fetched:', profiles?.length || 0, 'profiles');
    if (error) {
      console.error('❌ billingService: Error fetching profiles:', error);
      throw error;
    }

    return profiles || [];
  },

  async fetchPhoneLines() {
    console.log('📞 billingService: Fetching phone lines');
    const { data: phoneLines, error } = await supabase
      .from('phone_lines')
      .select('*');

    console.log('📞 billingService: Phone lines fetched:', phoneLines?.length || 0, 'lines');
    if (error) {
      console.error('❌ billingService: Error fetching phone lines:', error);
      throw error;
    }

    return phoneLines || [];
  },

  async fetchCommissions() {
    console.log('💰 billingService: Fetching commissions');
    const { data: commissions, error } = await supabase
      .from('network_commission_history')
      .select('*');

    console.log('💰 billingService: Commissions fetched:', commissions?.length || 0, 'commissions');
    if (error) {
      console.error('❌ billingService: Error fetching commissions:', error);
      throw error;
    }

    return commissions || [];
  }
};
