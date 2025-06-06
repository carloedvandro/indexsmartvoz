
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscription: string;
  charges: string;
  status: 'received' | 'confirmed' | 'awaiting' | 'overdue';
}

export interface BillingStatus {
  amount: number;
  liquid: number;
  clients: number;
  bills: number;
  color: string;
  progressColor: string;
  tooltip: string;
  clientsData: Client[];
}

export function useBillingData() {
  const [billingStatus, setBillingStatus] = useState<Record<string, BillingStatus>>({
    received: {
      amount: 3711.44,
      liquid: 3669.65,
      clients: 19,
      bills: 21,
      color: "text-[#27ae60]",
      progressColor: "bg-[#27ae60]",
      tooltip: "Cobranças recebidas dentro do período.",
      clientsData: []
    },
    confirmed: {
      amount: 179.99,
      liquid: 178.00,
      clients: 1,
      bills: 1,
      color: "text-[#3498db]",
      progressColor: "bg-[#3498db]/30 bg-stripe",
      tooltip: "Cobranças recebidas dentro do período, mas que estão aguardando o repasse.",
      clientsData: []
    },
    awaiting: {
      amount: 9739.12,
      liquid: 9579.95,
      clients: 52,
      bills: 53,
      color: "text-[#f39c12]",
      progressColor: "bg-[#f39c12]/30 bg-stripe",
      tooltip: "Cobranças previstas para recebimento dentro do período.",
      clientsData: []
    },
    overdue: {
      amount: 0.00,
      liquid: 0.00,
      clients: 0,
      bills: 0,
      color: "text-[#e74c3c]",
      progressColor: "bg-[#e74c3c]",
      tooltip: "Cobranças vencidas dentro do período e que não foram pagas.",
      clientsData: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 useBillingData: useEffect executado');
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      console.log('📊 useBillingData: Iniciando fetchBillingData');
      setLoading(true);
      setError(null);

      // Buscar dados dos clientes ativos
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email, phone, status')
        .eq('role', 'client')
        .not('full_name', 'is', null);

      console.log('👥 useBillingData: Profiles fetched:', profiles?.length || 0, 'profiles');
      if (profilesError) {
        console.error('❌ useBillingData: Erro ao buscar perfis:', profilesError);
      }

      // Buscar dados das linhas de telefone (assinaturas/cobranças)
      const { data: phoneLines, error: phoneLinesError } = await supabase
        .from('phone_lines')
        .select('*');

      console.log('📞 useBillingData: Phone lines fetched:', phoneLines?.length || 0, 'lines');
      if (phoneLinesError) {
        console.error('❌ useBillingData: Erro ao buscar linhas:', phoneLinesError);
      }

      // Buscar dados de comissões da rede
      const { data: commissions, error: commissionsError } = await supabase
        .from('network_commission_history')
        .select('*');

      console.log('💰 useBillingData: Commissions fetched:', commissions?.length || 0, 'commissions');
      if (commissionsError) {
        console.error('❌ useBillingData: Erro ao buscar comissões:', commissionsError);
      }

      // Processar dados para criar a estrutura de billing status
      const processedData = processClientData(profiles || [], phoneLines || [], commissions || []);
      console.log('⚙️ useBillingData: Processed data:', processedData);
      
      // Manter os valores fixos mas atualizar contadores de clientes
      setBillingStatus(prev => {
        const newStatus = {
          received: { 
            ...prev.received, 
            clients: processedData.received.clients,
            bills: processedData.received.bills,
            clientsData: processedData.received.clientsData 
          },
          confirmed: { 
            ...prev.confirmed, 
            clients: processedData.confirmed.clients,
            bills: processedData.confirmed.bills,
            clientsData: processedData.confirmed.clientsData 
          },
          awaiting: { 
            ...prev.awaiting, 
            clients: processedData.awaiting.clients,
            bills: processedData.awaiting.bills,
            clientsData: processedData.awaiting.clientsData 
          },
          overdue: { 
            ...prev.overdue, 
            clients: processedData.overdue.clients,
            bills: processedData.overdue.bills,
            clientsData: processedData.overdue.clientsData 
          }
        };
        console.log('🔄 useBillingData: Setting new billing status:', newStatus);
        return newStatus;
      });

    } catch (err) {
      console.error('❌ useBillingData: Erro ao buscar dados de cobrança:', err);
      setError('Erro ao carregar dados de cobrança');
    } finally {
      setLoading(false);
      console.log('✅ useBillingData: fetchBillingData concluído');
    }
  };

  const processClientData = (profiles: any[], phoneLines: any[], commissions: any[]) => {
    console.log('🔧 useBillingData: processClientData iniciado com:', {
      profiles: profiles.length,
      phoneLines: phoneLines.length,
      commissions: commissions.length
    });

    const clientsMap = new Map();

    // Processar perfis de clientes
    profiles.forEach(profile => {
      if (!clientsMap.has(profile.id)) {
        clientsMap.set(profile.id, {
          id: profile.id,
          name: profile.full_name || 'Nome não informado',
          email: profile.email || 'Email não informado',
          phone: profile.phone || 'Telefone não informado',
          subscription: 'R$ 0,00',
          charges: 'R$ 0,00',
          status: determineClientStatus(profile.status)
        });
      }
    });

    // Processar linhas de telefone para calcular valores
    phoneLines.forEach(line => {
      const client = clientsMap.get(line.owner_id);
      if (client) {
        // Simular valores baseados no plano
        const planValue = getPlanValue(line.plan_name);
        client.subscription = formatCurrency(planValue);
        client.charges = formatCurrency(planValue);
      }
    });

    // Agrupar clientes por status
    const groupedClients = {
      received: [],
      confirmed: [],
      awaiting: [],
      overdue: []
    };

    Array.from(clientsMap.values()).forEach((client: Client) => {
      if (groupedClients[client.status]) {
        groupedClients[client.status].push(client);
      }
    });

    console.log('📊 useBillingData: Clientes agrupados por status:', {
      received: groupedClients.received.length,
      confirmed: groupedClients.confirmed.length,
      awaiting: groupedClients.awaiting.length,
      overdue: groupedClients.overdue.length
    });

    // Retornar apenas os valores de clientes e bills calculados
    const result = {
      received: {
        clients: groupedClients.received.length,
        bills: groupedClients.received.length,
        clientsData: groupedClients.received
      },
      confirmed: {
        clients: groupedClients.confirmed.length,
        bills: groupedClients.confirmed.length,
        clientsData: groupedClients.confirmed
      },
      awaiting: {
        clients: groupedClients.awaiting.length,
        bills: groupedClients.awaiting.length,
        clientsData: groupedClients.awaiting
      },
      overdue: {
        clients: groupedClients.overdue.length,
        bills: groupedClients.overdue.length,
        clientsData: groupedClients.overdue
      }
    };

    console.log('✅ useBillingData: processClientData resultado:', result);
    return result;
  };

  const determineClientStatus = (profileStatus: string): 'received' | 'confirmed' | 'awaiting' | 'overdue' => {
    switch (profileStatus) {
      case 'approved':
        return 'received';
      case 'pending':
        return 'awaiting';
      case 'blocked':
        return 'overdue';
      default:
        return Math.random() > 0.7 ? 'received' : Math.random() > 0.5 ? 'awaiting' : 'overdue';
    }
  };

  const getPlanValue = (planName: string): number => {
    // Valores baseados nos planos comuns
    const planValues: Record<string, number> = {
      'basic': 29.90,
      'premium': 49.90,
      'enterprise': 89.90,
      'starter': 19.90
    };

    const plan = planName?.toLowerCase() || '';
    for (const [key, value] of Object.entries(planValues)) {
      if (plan.includes(key)) {
        return value;
      }
    }

    // Valor padrão se não encontrar o plano
    return Math.random() * 100 + 20;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  console.log('📋 useBillingData: Hook retornando:', {
    billingStatus: Object.keys(billingStatus).reduce((acc, key) => {
      acc[key] = {
        amount: billingStatus[key].amount,
        clients: billingStatus[key].clients,
        bills: billingStatus[key].bills
      };
      return acc;
    }, {} as any),
    loading,
    error
  });

  return {
    billingStatus,
    loading,
    error,
    refetch: fetchBillingData
  };
}
