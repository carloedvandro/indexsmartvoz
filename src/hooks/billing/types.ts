
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

export type BillingStatusMap = Record<string, BillingStatus>;

export interface ProcessedClientData {
  received: {
    clients: number;
    bills: number;
    clientsData: Client[];
  };
  confirmed: {
    clients: number;
    bills: number;
    clientsData: Client[];
  };
  awaiting: {
    clients: number;
    bills: number;
    clientsData: Client[];
  };
  overdue: {
    clients: number;
    bills: number;
    clientsData: Client[];
  };
}
