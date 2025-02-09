
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
    <div className="flex flex-col items-center w-full mt-2">
      <div className="text-center mb-4 mt-2">
        <h2 className="text-xl font-normal -mt-[5px]">
          Escolha a melhor data de vencimento da sua fatura:
        </h2>
      </div>

      <div className="w-full px-4 max-w-[400px] mx-auto">
        <div className="grid grid-cols-4 gap-4 w-full mt-2">
          {dueDates.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((date) => (
                <Card 
                  key={date}
                  className={`cursor-pointer transition-colors h-8 flex items-center justify-center border-gray-200
                    ${selectedDueDate === date 
                      ? `bg-[${calendarStyle?.theme_color || '#0040FF'}] text-white border-[${calendarStyle?.theme_color || '#0040FF'}]`
                      : `hover:bg-[${calendarStyle?.hover_color || '#0040FF'}] hover:text-white hover:border-[${calendarStyle?.hover_color || '#0040FF'}]`
                    }`}
                  style={{
                    borderRadius: calendarStyle?.border_radius || '8px',
                  }}
                  onClick={() => setSelectedDueDate(date)}
                >
                  <CardContent className="flex items-center justify-center h-full p-0">
                    <span 
                      className="font-medium"
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
