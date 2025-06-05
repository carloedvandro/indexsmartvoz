
import { Client, ProcessedBillingData } from './types';
import { determineClientStatus, getPlanValue, formatCurrency } from './utils';

export const processClientData = (profiles: any[], phoneLines: any[], commissions: any[]): ProcessedBillingData => {
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

  // Retornar apenas os valores de clientes e bills calculados
  return {
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
};
