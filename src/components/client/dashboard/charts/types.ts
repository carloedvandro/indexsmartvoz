export interface ExpenseData {
  category: string;
  percentage: number;
  color: string;
}

export const expenseData: ExpenseData[] = [
  { category: "Nível 1", percentage: 85, color: "#6E59A5" },
  { category: "Nível 2", percentage: 65, color: "#ff00d6" },
  { category: "Nível 3", percentage: 45, color: "#f70000" },
  { category: "Nível 4", percentage: 35, color: "#0ea5e9" },
];