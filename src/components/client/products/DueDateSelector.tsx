
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarStyle } from "@/hooks/useCalendarStyles";

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
  calendarStyle?: CalendarStyle;
}

export function DueDateSelector({
  selectedDueDate,
  setSelectedDueDate,
  calendarStyle
}: DueDateSelectorProps) {
  const dueDates = [
    [2, 5, 7, 10],
    [15, 20, 25, 30]
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4 w-full">
        {dueDates.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((date) => (
              <Card 
                key={date}
                className={`cursor-pointer transition-all duration-200 h-10 flex items-center justify-center shadow-none border border-[#8425af] ${
                  selectedDueDate === date ? 'bg-[#8425af] text-white' : 'bg-white'
                }`}
                onClick={() => setSelectedDueDate(date)}
              >
                <CardContent className="flex items-center justify-center h-full p-0">
                  <span className="font-medium text-center">
                    {date.toString().padStart(2, '0')}
                  </span>
                </CardContent>
              </Card>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
