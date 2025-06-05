
import { BillingStatus } from './types';

export const initialBillingStatus: Record<string, BillingStatus> = {
  received: {
    amount: 13630.44,
    liquid: 13469.65,
    clients: 0,
    bills: 0,
    color: "text-[#27ae60]",
    progressColor: "bg-[#27ae60]",
    tooltip: "Cobranças recebidas dentro do período.",
    clientsData: []
  },
  confirmed: {
    amount: 1179.99,
    liquid: 1165.00,
    clients: 0,
    bills: 0,
    color: "text-[#3498db]",
    progressColor: "bg-[#3498db]/30 bg-stripe",
    tooltip: "Cobranças recebidas dentro do período, mas que estão aguardando o repasse.",
    clientsData: []
  },
  awaiting: {
    amount: 7739.12,
    liquid: 7679.95,
    clients: 0,
    bills: 0,
    color: "text-[#f39c12]",
    progressColor: "bg-[#f39c12]/30 bg-stripe",
    tooltip: "Cobranças previstas para recebimento dentro do período.",
    clientsData: []
  },
  overdue: {
    amount: 2150.00,
    liquid: 2100.00,
    clients: 0,
    bills: 0,
    color: "text-[#e74c3c]",
    progressColor: "bg-[#e74c3c]",
    tooltip: "Cobranças vencidas dentro do período e que não foram pagas.",
    clientsData: []
  }
};
