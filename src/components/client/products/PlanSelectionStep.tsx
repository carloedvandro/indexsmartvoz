
import { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";

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
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

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

          <div className="w-full px-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-700">{currentMonth}</div>
                <div className="text-xl text-gray-500">{currentYear}</div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div 
                    key={index} 
                    className="text-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = i + 1;
                  const isSelectable = dueDates.includes(date);
                  if (date > 31) return <div key={i} />;
                  
                  return (
                    <div 
                      key={i}
                      className={`
                        text-center py-2 text-sm
                        ${isSelectable ? 'cursor-pointer hover:bg-blue-50 rounded-full' : 'text-gray-300'}
                        ${selectedDueDate === date ? 'bg-blue-500 text-white rounded-full' : ''}
                        ${[2, 9, 16, 23].includes(date) ? 'text-red-500' : ''}
                      `}
                      onClick={() => isSelectable && setSelectedDueDate(date)}
                    >
                      {date}
                    </div>
                  );
                })}
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
