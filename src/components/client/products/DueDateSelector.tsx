
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarStyle } from "@/hooks/useCalendarStyles";
import { motion } from "framer-motion";

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

  const numberVariants = {
    selected: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    unselected: {
      scale: 1
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-2">
      <div className="text-center mb-3 mt-1">
        <h2 className="text-base font-normal -mt-[5px]">
          Escolha a melhor data de vencimento da sua fatura:
        </h2>
      </div>

      <div className="w-full max-w-[360px] mx-auto">
        <div className="grid grid-cols-4 gap-2 w-full mt-1">
          {dueDates.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((date) => (
                <Card 
                  key={date}
                  className={`cursor-pointer transition-all duration-200 h-9 flex items-center justify-center shadow-none relative overflow-hidden rounded-xl
                    ${selectedDueDate === date 
                      ? 'bg-[#8425af] text-white border-none' 
                      : 'bg-white border border-[#8425af]/20 hover:border-[#8425af]/40'
                    }`}
                  onClick={() => setSelectedDueDate(date)}
                >
                  <CardContent className="flex items-center justify-center h-full p-0">
                    <motion.span 
                      className={`font-medium ${selectedDueDate === date ? 'text-white' : 'text-[#8425af]'}`}
                      style={{
                        fontSize: calendarStyle?.date_font_size || '14px'
                      }}
                      variants={numberVariants}
                      initial="unselected"
                      animate={selectedDueDate === date ? "selected" : "unselected"}
                    >
                      {date.toString().padStart(2, '0')}
                    </motion.span>
                  </CardContent>
                </Card>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
