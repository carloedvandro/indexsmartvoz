
import { Client } from './types';

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

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
