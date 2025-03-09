
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarStyle } from "@/hooks/useCalendarStyles";

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
  calendarStyle?: CalendarStyle;
  selectedCardClassName?: string;
}

export function DueDateSelector({
  selectedDueDate,
  setSelectedDueDate,
  calendarStyle,
  selectedCardClassName
}: DueDateSelectorProps) {
  const dueDates = [
    [2, 5, 7, 10],
    [15, 20, 25, 30]
  ];

  return (
    <div className="flex flex-col items-center w-full mt-2">
      <div className="text-center mb-3 mt-1">
        <h2 className="text-base font-normal -mt-[5px]">
          Escolha a melhor data de vencimento da sua fatura:
        </h2>
      </div>

      <div className="w-full max-w-[320px] mx-auto">
        <div className="grid grid-cols-4 gap-2 w-full mt-1">
          {dueDates.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((date) => (
                <Card 
                  key={date}
                  className={`cursor-pointer transition-all duration-200 h-8 flex items-center justify-center shadow-none relative
                    ${selectedDueDate === date 
                      ? `ring-2 ring-[#8425af] ring-offset-0 border-none ${selectedCardClassName || ''} before:absolute before:inset-[1px] before:border before:border-[#8425af] before:rounded-[7px]`
                      : 'border border-[#8425af] hover:border-[#8425af]'
                    }`}
                  style={{
                    borderRadius: calendarStyle?.border_radius || '8px',
                  }}
                  onClick={() => setSelectedDueDate(date)}
                >
                  <CardContent className="flex items-center justify-center h-full p-0">
                    <span 
                      className={`font-medium ${selectedDueDate === date ? 'text-[#8425af]' : ''}`}
                      style={{
                        fontSize: calendarStyle?.date_font_size || '14px'
                      }}
                    >
                      {date.toString().padStart(2, '0')}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
