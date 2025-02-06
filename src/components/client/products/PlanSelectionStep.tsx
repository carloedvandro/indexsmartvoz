
import { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
};

interface PlanSelectionStepProps {
  selectedLines: Line[];
  setSelectedLines: (lines: Line[]) => void;
  selectedDueDate: number | null;
  setSelectedDueDate: (date: number) => void;
}

export function PlanSelectionStep({ 
  selectedLines, 
  setSelectedLines,
  selectedDueDate,
  setSelectedDueDate 
}: PlanSelectionStepProps) {
  const { data: calendarStyle } = useCalendarStyles();
  
  const internetOptions = [
    { value: "Plano Gratuito", label: "Plano Gratuito", price: 0 },
    { value: "110GB", label: "110GB", price: 109.99 },
    { value: "120GB", label: "120GB", price: 119.99 },
    { value: "130GB", label: "130GB", price: 129.99 },
    { value: "140GB", label: "140GB", price: 139.99 },
    { value: "150GB", label: "150GB", price: 149.99 },
  ];

  const dueDates = [1, 5, 7, 10, 15, 20];
  const currentDate = new Date();
  const currentMonth = format(currentDate, 'MMMM yyyy', { locale: ptBR });
  const holidays = [1, 4, 18]; // Example holidays for demonstration

  useState(() => {
    if (selectedLines.length === 0) {
      setSelectedLines([
        {
          id: 1,
          internet: "",
          type: "Nova Linha",
          ddd: "",
          price: 0,
        },
      ]);
    }
  });

  const handleInternetChange = (value: string) => {
    const newPrice = internetOptions.find(option => option.value === value)?.price || 0;
    setSelectedLines(selectedLines.map(line => 
      line.id === 1 
        ? { ...line, internet: value, price: newPrice, ddd: value === "Plano Gratuito" ? "00" : line.ddd }
        : line
    ));
  };

  const handleDDDChange = (value: string) => {
    setSelectedLines(selectedLines.map(line => 
      line.id === 1 
        ? { ...line, ddd: value }
        : line
    ));
  };

  const totalPrice = selectedLines.reduce((acc, line) => acc + line.price, 0);
  const isFreePlan = selectedLines[0]?.internet === "Plano Gratuito";

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Add previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isPrevMonth: true
      });
    }
    
    // Add current month days
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        date: i,
        isPrevMonth: false,
        isHoliday: holidays.includes(i),
        isSunday: new Date(year, month, i).getDay() === 0,
        isSelectable: dueDates.includes(i)
      });
    }

    // Add next month days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isNextMonth: true
      });
    }

    return days;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="space-y-2"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-medium">Personalize seu pedido</h2>
        <p className="text-gray-600">
          Confira aqui as melhores ofertas para você, cliente Smatvoz.
        </p>
      </motion.div>

      <div className="space-y-4 w-full">
        <motion.div 
          className="grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
          <div className="w-full">
            <InternetSelector
              selectedInternet={selectedLines[0]?.internet || undefined}
              onInternetChange={handleInternetChange}
              internetOptions={internetOptions}
            />
          </div>
          {!isFreePlan && (
            <div className="w-full">
              <DDDInput
                ddd={selectedLines[0]?.ddd || ""}
                onDDDChange={handleDDDChange}
              />
            </div>
          )}
        </motion.div>

        <motion.div 
          className="flex flex-col items-center w-full mt-2"
          variants={itemVariants}
        >
          <div className="text-center mb-4 mt-2 w-full">
            <h2 className="text-xl font-normal -mt-[5px]">
              Escolha a melhor data de vencimento da sua fatura:
            </h2>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="text-lg font-medium capitalize">{currentMonth}</h3>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                  <div 
                    key={index} 
                    className={`text-center text-sm font-medium ${index === 0 ? 'text-[#ea384c]' : 'text-blue-600'}`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((day, index) => (
                  <div 
                    key={index}
                    className={`
                      text-center py-2 text-sm select-none
                      ${day.isPrevMonth || day.isNextMonth ? 'text-gray-400' : 'text-gray-700'}
                      ${day.isSelectable && !day.isPrevMonth && !day.isNextMonth ? 'cursor-pointer hover:bg-blue-50' : ''}
                      ${selectedDueDate === day.date && !day.isPrevMonth && !day.isNextMonth ? 'bg-blue-600 text-white rounded-lg' : ''}
                      ${(day.isSunday || day.isHoliday) && !day.isPrevMonth && !day.isNextMonth ? 'text-[#ea384c]' : ''}
                    `}
                    onClick={() => day.isSelectable && !day.isPrevMonth && !day.isNextMonth && setSelectedDueDate(day.date)}
                  >
                    {day.date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PriceSummary
            linePrice={selectedLines[0]?.price || 0}
            totalPrice={totalPrice}
          />
        </motion.div>
      </div>
    </div>
  );
}

