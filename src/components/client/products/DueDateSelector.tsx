
import React from "react";
import { cn } from "@/lib/utils";

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
  selectedCardClassName?: string;
  calendarStyle?: any;
}

export function DueDateSelector({
  selectedDueDate,
  setSelectedDueDate,
  selectedCardClassName = "",
  calendarStyle,
}: DueDateSelectorProps) {
  // Datas disponíveis
  const availableDates = [1, 5, 10, 15, 20, 25];

  // Formatar a data de vencimento
  const formatDueDate = (day: number) => {
    return `Dia ${day}`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium mb-1 block">
          Data de Vencimento
        </span>
        <div className="grid grid-cols-3 gap-2">
          {availableDates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => setSelectedDueDate(date)}
              className={cn(
                "border rounded-md py-2 px-1 text-center transition-colors",
                selectedDueDate === date
                  ? `border-[#8425af] bg-[#8425af] text-white ${selectedCardClassName}`
                  : "border-gray-300 bg-white text-gray-700 hover:border-[#8425af]"
              )}
            >
              {formatDueDate(date)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
