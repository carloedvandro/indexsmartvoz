import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DueDateStepProps {
  selectedDueDate: number | null;
  onDueDateChange: (date: number) => void;
}

export function DueDateStep({ selectedDueDate, onDueDateChange }: DueDateStepProps) {
  const dueDatesRow1 = [2, 5, 7, 10];
  const dueDatesRow2 = [15, 20, 25, 30];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Escolha a melhor data de vencimento da sua fatura:</h2>
      </div>

      <div className="max-w-xl mx-auto grid grid-cols-4 gap-x-6 gap-y-4">
        {dueDatesRow1.map((date) => (
          <Card 
            key={date}
            className={`cursor-pointer transition-colors w-20 h-20 ${
              selectedDueDate === date 
                ? 'bg-[#8425af] text-white' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => onDueDateChange(date)}
          >
            <CardContent className="flex items-center justify-center h-full p-1">
              <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
            </CardContent>
          </Card>
        ))}
        {dueDatesRow2.map((date) => (
          <Card 
            key={date}
            className={`cursor-pointer transition-colors w-20 h-20 ${
              selectedDueDate === date 
                ? 'bg-[#8425af] text-white' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => onDueDateChange(date)}
          >
            <CardContent className="flex items-center justify-center h-full p-1">
              <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}