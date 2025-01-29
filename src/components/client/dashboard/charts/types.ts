export interface ExpenseData {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

export const expenseData: ExpenseData[] = [
  { category: "Taxas", percentage: 20, amount: 2000, color: "#5f0889" },
  { category: "Marketing", percentage: 40, amount: 4000, color: "#0EA5E9" },
  { category: "Utilidades", percentage: 12, amount: 1200, color: "#5f0889" },
  { category: "Aluguel", percentage: 8, amount: 800, color: "#0EA5E9" },
  { category: "Salários", percentage: 11, amount: 1100, color: "#5f0889" },
  { category: "Seguros", percentage: 9, amount: 900, color: "#0EA5E9" },
];