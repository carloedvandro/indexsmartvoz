import { formatCurrency } from "@/utils/format";
import { supabase } from "@/integrations/supabase/client";

export type EarningsSettings = {
  active_earnings_label: string;
  pending_earnings_label: string;
  total_earnings_label: string;
  active_earnings_color: string;
  pending_earnings_color: string;
  total_earnings_color: string;
};

export const fetchEarningsSettings = async (): Promise<EarningsSettings> => {
  const { data: session } = await supabase.auth.getSession();
  
  if (!session?.session?.user?.id) {
    console.error('No user session found');
    return getDefaultSettings();
  }

  const { data: settings, error } = await supabase
    .from('earnings_settings')
    .select('*')
    .eq('user_id', session.session.user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching earnings settings:', error);
    return getDefaultSettings();
  }

  return settings || getDefaultSettings();
};

const getDefaultSettings = (): EarningsSettings => ({
  active_earnings_label: 'Ganhos Ativos',
  pending_earnings_label: 'Ganhos Pendentes',
  total_earnings_label: 'Total de Ganhos',
  active_earnings_color: '#4F46E5',
  pending_earnings_color: '#ff0000',
  total_earnings_color: '#00d71c'
});

export const generateCardData = async () => {
  const settings = await fetchEarningsSettings();
  
  return [
    {
      title: settings.active_earnings_label,
      value: formatCurrency(130510),
      data: generateMonthlyData(),
      color: settings.active_earnings_color,
    },
    {
      title: settings.pending_earnings_label,
      value: formatCurrency(175035),
      data: generateMonthlyData(),
      color: settings.pending_earnings_color,
    },
    {
      title: settings.total_earnings_label,
      value: formatCurrency(210375),
      data: generateMonthlyData(),
      color: settings.total_earnings_color,
    },
  ];
};

const generateMonthlyData = () => {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];

  return months.map((name) => ({
    name,
    value: Math.floor(Math.random() * 100000),
  }));
};

export const generateRevenueData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(1); // Primeiro dia do mês atual
  const currentDate = new Date();
  
  let accumulatedValue = 0;
  const dailyRevenues = new Map(); // Armazena os valores diários

  // Gera valores diários aleatórios para o mês atual
  for (let i = 0; i < currentDate.getDate(); i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Gera um valor diário entre 1000 e 5000
    const dailyValue = Math.floor(Math.random() * 4000) + 1000;
    dailyRevenues.set(date.getDate(), dailyValue);
    
    // Acumula o valor
    accumulatedValue += dailyValue;
    
    data.push({
      name: `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`,
      value: accumulatedValue,
      dailyValue: dailyValue,
    });
  }

  return data;
};
