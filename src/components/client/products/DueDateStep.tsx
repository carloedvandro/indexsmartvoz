import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DueDateStepProps {
  selectedDueDate: number | null;
  onDueDateChange: (date: number) => void;
}

export function DueDateStep({ selectedDueDate, onDueDateChange }: DueDateStepProps) {
  const dueDates = [2, 5, 7, 10, 15, 20, 25, 30];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Escolha a melhor data de vencimento da sua fatura:</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dueDates.map((date) => (
          <Card 
            key={date}
            className={`cursor-pointer transition-colors ${
              selectedDueDate === date 
                ? 'bg-[#8425af] text-white' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => onDueDateChange(date)}
          >
            <CardContent className="flex items-center justify-center px-2 py-1">
              <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}