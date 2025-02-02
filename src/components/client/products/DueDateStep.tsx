import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DueDateStepProps {
  selectedDueDate: number | null;
  onDueDateChange: (date: number) => void;
}

export function DueDateStep({ selectedDueDate, onDueDateChange }: DueDateStepProps) {
  const dueDates = [2, 5, 7, 10, 15, 20, 25, 30];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Escolha a melhor data de vencimento da sua fatura:</h2>
      </div>

      <div className="max-w-xl mx-auto grid grid-cols-8 gap-x-4 gap-y-1">
        {dueDates.map((date) => (
          <Card 
            key={date}
            className={`cursor-pointer transition-colors w-12 h-12 ${
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