
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";
import { motion } from "framer-motion";

interface DueDateSelectorProps {
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
  calendarStyle?: any;
  selectedCardClassName?: string;
}

export function DueDateSelector({
  selectedDueDate,
  setSelectedDueDate,
  calendarStyle,
  selectedCardClassName
}: DueDateSelectorProps) {
  // Atualizando as datas conforme solicitado: 2-5-8-11-14 e 17-20-23-26-29
  const dueDates = [
    [2, 5, 8, 11, 14],
    [17, 20, 23, 26, 29]
  ];

  const numberVariants = {
    selected: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const
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

      <div className="w-full ">
        <div className="grid grid-cols-5 gap-2 w-full mt-1">
          {dueDates.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
