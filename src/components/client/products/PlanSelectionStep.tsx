
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
    { value: "120GB", label: "120GB", price: 119.99 },
    { value: "140GB", label: "140GB", price: 129.99 },
    { value: "160GB", label: "160GB", price: 139.99 },
    { value: "180GB", label: "180GB", price: 149.99 },
    { value: "200GB", label: "200GB", price: 159.99 },
  ];

  const dueDates = [2, 5, 7, 10, 15, 20, 25, 30];

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
    <div className="space-y-6 -mt-[15px]">
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
          <div className="text-center mb-4 mt-2">
            <h2 className="text-xl font-normal -mt-[5px]">
              Escolha a melhor data de vencimento da sua fatura:
            </h2>
          </div>

          <div className="w-full px-4 max-w-[400px] mx-auto">
            <div className="grid grid-cols-4 gap-4 w-full mt-2">
              {[
                [2, 5, 7, 10],
                [15, 20, 25, 30]
              ].map((row, rowIndex) => (
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
