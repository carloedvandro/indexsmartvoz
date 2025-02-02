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
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-6 px-4">
        <h2 className="text-xl font-semibold">
          Escolha a melhor data de vencimento da sua fatura:
        </h2>
      </div>

      <div className="w-full px-4 sm:px-0 sm:w-[320px]">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {dueDatesRow1.map((date) => (
            <Card 
              key={date}
              className={`cursor-pointer transition-colors h-16 sm:h-[72px] flex items-center justify-center ${
                selectedDueDate === date 
                  ? 'bg-[#8425af] text-white' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => onDueDateChange(date)}
            >
              <CardContent className="flex items-center justify-center h-full p-0">
                <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
              </CardContent>
            </Card>
          ))}
          {dueDatesRow2.map((date) => (
            <Card 
              key={date}
              className={`cursor-pointer transition-colors h-16 sm:h-[72px] flex items-center justify-center ${
                selectedDueDate === date 
                  ? 'bg-[#8425af] text-white' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => onDueDateChange(date)}
            >
              <CardContent className="flex items-center justify-center h-full p-0">
                <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}