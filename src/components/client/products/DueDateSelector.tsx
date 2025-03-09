
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarStyle } from "@/hooks/useCalendarStyles";

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
  calendarStyle?: CalendarStyle;
  variants?: any;
}

export function DueDateSelector({
  selectedDueDate,
  setSelectedDueDate,
  calendarStyle,
  variants
}: DueDateSelectorProps) {
  const dueDates = [5, 10, 15, 20, 25];

  const handleSelectDueDate = (dueDate: number) => {
    setSelectedDueDate(dueDate);
  };

  return (
    <div className="w-full" style={variants}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        Data de Vencimento
      </label>
      <div className="grid grid-cols-5 gap-1 w-full">
        {dueDates.map((dueDate) => (
          <button
            key={dueDate}
            type="button"
            onClick={() => handleSelectDueDate(dueDate)}
            className={`w-full py-2 text-center rounded-md text-sm transition-colors ${
              selectedDueDate === dueDate
                ? "bg-[#8425af] text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {dueDate}
          </button>
        ))}
      </div>
    </div>
  );
}
