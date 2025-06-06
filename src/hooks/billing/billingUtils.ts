
import { Client, ProcessedBillingData } from './types';

export const determineClientStatus = (profileStatus: string): 'received' | 'confirmed' | 'awaiting' | 'overdue' => {
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

export const getPlanValue = (planName: string): number => {
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

  return Math.random() * 100 + 20;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const processClientData = (profiles: any[], phoneLines: any[], commissions: any[]): ProcessedBillingData => {
  console.log('🔧 billingUtils: processClientData initiated with:', {
    profiles: profiles.length,
    phoneLines: phoneLines.length,
    commissions: commissions.length
  });

  const clientsMap = new Map();

  // Process client profiles
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

  // Process phone lines to calculate values
  phoneLines.forEach(line => {
    const client = clientsMap.get(line.owner_id);
    if (client) {
      const planValue = getPlanValue(line.plan_name);
      client.subscription = formatCurrency(planValue);
      client.charges = formatCurrency(planValue);
    }
  });

  // Group clients by status
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

  console.log('📊 billingUtils: Clients grouped by status:', {
    received: groupedClients.received.length,
    confirmed: groupedClients.confirmed.length,
    awaiting: groupedClients.awaiting.length,
    overdue: groupedClients.overdue.length
  });

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

  console.log('✅ billingUtils: processClientData result:', result);
  return result;
};
