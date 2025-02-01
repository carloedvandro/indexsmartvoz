import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DueDateStepProps {
  selectedDueDate: number | null;
  onDueDateChange: (date: number) => void;
}

export function DueDateStep({ selectedDueDate, onDueDateChange }: DueDateStepProps) {
  const dueDates = [1, 6, 10, 17, 26, 29];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Escolha a data de vencimento da sua fatura:</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
            <CardContent className="flex items-center justify-center p-6">
              <span className="text-xl font-medium">{String(date).padStart(2, '0')}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}