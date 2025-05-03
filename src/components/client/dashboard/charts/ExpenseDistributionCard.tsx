
import React from "react";
import { Card } from "@/components/ui/card";
import { ExpensePieChart, ExpenseLegend } from "./expense-distribution";

export const ExpenseDistributionCard = () => {
  const expenseData = [
    { name: "Marketing", value: 35, color: "#9b87f5" },
    { name: "Infraestrutura", value: 25, color: "#33C3F0" },
    { name: "Pessoal", value: 30, color: "#D6BCFA" },
    { name: "Outros", value: 10, color: "#E5E7EB" }
  ];
  
  return (
    <Card className="p-6 shadow-sm h-full w-full border-0 rounded-xl shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">Distribuição de Despesas</h3>
      </div>
      
      <div className="flex flex-col">
        <ExpensePieChart expenseData={expenseData} />
        <ExpenseLegend expenseData={expenseData} />
      </div>
    </Card>
  );
};
