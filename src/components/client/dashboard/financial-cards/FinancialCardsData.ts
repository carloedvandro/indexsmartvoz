
// Financial cards data structure and default values
export interface FinancialCardData {
  path: string;
  bgColor: string;
  hoverColor: string;
  icon: "dollar" | "chart" | "trending";
  amount: number;
  label: string;
}

// Default values for the financial cards
export const defaultFinancialCardsData: {
  availableBalance: number;
  totalEarnings: number;
  forecastBonus: number;
} = {
  availableBalance: 5000.01,
  totalEarnings: 42576.22,
  forecastBonus: 0.00,
};

// Financial cards styling configuration
export const financialCardsConfig = [
  {
    key: "availableBalance",
    path: "/client/financial",
    bgColor: "bg-[#8BC34A]",
    hoverColor: "hover:bg-[#7CB342]",
    icon: "dollar" as const,
    label: "Saldo Disponível"
  },
  {
    key: "totalEarnings",
    path: "/client/financial",
    bgColor: "bg-[#FFC107]",
    hoverColor: "hover:bg-[#FFB300]",
    icon: "chart" as const,
    label: "Ganhos até hoje"
  },
  {
    key: "forecastBonus",
    path: "/client/earnings-forecast",
    bgColor: "bg-[#29B6F6]", 
    hoverColor: "hover:bg-[#03A9F4]",
    icon: "trending" as const,
    label: "Previsão de Ganhos"
  }
];
