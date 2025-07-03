
import { supabase } from "@/integrations/supabase/client";

interface EarningsSettings {
  active_earnings_label: string;
  pending_earnings_label: string;
  total_earnings_label: string;
  active_earnings_color: string;
  pending_earnings_color: string;
  total_earnings_color: string;
}

export const fetchEarningsSettings = async (): Promise<EarningsSettings> => {
  console.log('🔍 Buscando configurações de ganhos...');
  
  try {
    // Return default settings since the table doesn't exist in the current schema
    const defaultSettings: EarningsSettings = {
      active_earnings_label: 'Ganhos Ativos',
      pending_earnings_label: 'Ganhos Pendentes', 
      total_earnings_label: 'Total de Ganhos',
      active_earnings_color: '#22c55e',
      pending_earnings_color: '#f59e0b',
      total_earnings_color: '#3b82f6'
    };

    console.log('✅ Configurações padrão de ganhos carregadas');
    return defaultSettings;
  } catch (error) {
    console.error('❌ Erro ao buscar configurações de ganhos:', error);
    
    // Return default fallback settings
    return {
      active_earnings_label: 'Ganhos Ativos',
      pending_earnings_label: 'Ganhos Pendentes',
      total_earnings_label: 'Total de Ganhos', 
      active_earnings_color: '#22c55e',
      pending_earnings_color: '#f59e0b',
      total_earnings_color: '#3b82f6'
    };
  }
};

export const calculateNetworkStats = (networkData: any[]) => {
  const totalMembers = networkData.length;
  const activeMembers = networkData.filter(member => member.status === 'active').length;
  const pendingMembers = networkData.filter(member => member.status === 'pending').length;
  
  return {
    total: totalMembers,
    active: activeMembers,
    pending: pendingMembers,
    inactive: totalMembers - activeMembers - pendingMembers
  };
};
