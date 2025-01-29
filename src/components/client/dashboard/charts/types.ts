export interface ExpenseData {
  category: string;
  percentage: number;
  color: string;
}

export const expenseData: ExpenseData[] = [
  { category: "Nível 1", percentage: 85, color: "#5f0889" },
  { category: "Nível 2", percentage: 65, color: "#ff00d6" },
  { category: "Nível 3", percentage: 45, color: "#f70000" },
  { category: "Nível 4", percentage: 35, color: "#0ea5e9" },
  { category: "Nível 5", percentage: 25, color: "#10b981" },
  { category: "Nível 6", percentage: 15, color: "#6366f1" },
];