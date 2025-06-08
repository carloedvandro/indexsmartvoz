
import { BillingStatusMap } from './types';

export const INITIAL_BILLING_STATUS: BillingStatusMap = {
  received: {
    amount: 3711.44,
    liquid: 3669.65,
    clients: 19,
    bills: 21,
    color: "text-[#00cc02]",
    progressColor: "bg-[#00cc02]",
    tooltip: "Cobranças recebidas dentro do período.",
    clientsData: []
  },
  confirmed: {
    amount: 179.99,
    liquid: 178.00,
    clients: 1,
    bills: 1,
    color: "text-[#0038ff]",
    progressColor: "bg-[#0038ff]/30 bg-stripe",
    tooltip: "Cobranças recebidas dentro do período, mas que estão aguardando o repasse.",
    clientsData: []
  },
  awaiting: {
    amount: 9739.12,
    liquid: 9579.95,
    clients: 52,
    bills: 53,
    color: "text-[#ff7300]",
    progressColor: "bg-[#ff7300]/30 bg-stripe",
    tooltip: "Cobranças previstas para recebimento dentro do período.",
    clientsData: []
  },
  overdue: {
    amount: 0.00,
    liquid: 0.00,
    clients: 0,
    bills: 0,
    color: "text-[#ff0000]",
    progressColor: "bg-[#ff0000]",
    tooltip: "Cobranças vencidas dentro do período e que não foram pagas.",
    clientsData: []
  }
};
