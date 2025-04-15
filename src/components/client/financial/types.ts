
/**
 * Common types shared between financial components
 */

export interface Transaction {
  date: string;
  type: string;
  description: string;
  value: string;
  balance: string;
}

export interface Month {
  value: string;
  label: string;
}

export interface Year {
  value: string;
  label: string;
}

export interface FinancialSummaryData {
  totalEarnings: string;
  balance: string;
  availableBalance: string;
}

export interface FilterOptions {
  selectedMonth: string;
  selectedYear: string;
  months: Month[];
  years: Year[];
}

export interface BalanceDetails {
  totalBonus: string;
  blockedBalance: string;
  availableBalance: string;
}
