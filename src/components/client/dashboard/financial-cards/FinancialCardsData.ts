
// Financial cards data structure and default values
export interface FinancialCardData {
  path: string;
  bgColor: string;
  hoverColor: string;
  amount: number;
  label: string;
}

// Default values for the financial cards
export const defaultFinancialCardsData = {
  availableBalance: 5000.01,
  totalEarnings: 42576.22,
  forecastBonus: 0.00,
};
