
import React from "react";
import { ExpenseItem } from "./types";

interface ExpenseLegendProps {
  expenseData: ExpenseItem[];
}

export const ExpenseLegend = ({ expenseData }: ExpenseLegendProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      {expenseData.map((expense, index) => (
        <div key={index} className="flex items-center">
          <div className="min-w-3 h-3 rounded-full mr-2" style={{ backgroundColor: expense.color }}></div>
          <p className="text-xs text-gray-600 whitespace-normal">
            {expense.name} <span className="font-bold">{expense.value}%</span>
          </p>
        </div>
      ))}
    </div>
  );
};
