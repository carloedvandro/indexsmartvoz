import { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  const internetOptions = [
    { value: "110GB", label: "110GB", price: 114.99 },
    { value: "120GB", label: "120GB", price: 124.99 },
    { value: "130GB", label: "130GB", price: 134.99 },
    { value: "140GB", label: "140GB", price: 144.99 },
    { value: "150GB", label: "150GB", price: 154.99 },
    { value: "160GB", label: "160GB", price: 164.99 },
  ];

  const dueDates = [1, 5, 7, 10, 15, 20];

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
        ? { ...line, internet: value, price: newPrice }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="space-y-2"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-medium">Personalize seu pedido</h2>
        <p className="text-gray-600">
          Confira aqui as melhores ofertas para você, cliente Smatvoz.
        </p>
      </motion.div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <motion.div 
          className="grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
          <InternetSelector
            selectedInternet={selectedLines[0]?.internet || undefined}
            onInternetChange={handleInternetChange}
            internetOptions={internetOptions}
          />
          <DDDInput
            ddd={selectedLines[0]?.ddd || ""}
            onDDDChange={handleDDDChange}
          />
        </motion.div>

        <motion.div 
          className="flex flex-col items-center w-full mt-4"
          variants={itemVariants}
        >
          <div className="text-center mb-4">
            <h2 className="text-xl">
              Escolha a melhor data de vencimento da sua fatura:
            </h2>
          </div>

          <div className="w-full px-4">
            <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto mt-4">
              {dueDates.map((date) => (
                <Card 
                  key={date}
                  className={`cursor-pointer transition-colors h-8 flex items-center justify-center bg-white border-gray-200 ${
                    selectedDueDate === date 
                      ? 'bg-[#8425af] text-white border-[#8425af]' 
                      : 'hover:bg-[#8425af] hover:text-white hover:border-[#8425af]'
                  }`}
                  onClick={() => setSelectedDueDate(date)}
                >
                  <CardContent className="flex items-center justify-center h-full p-0">
                    <span className="text-lg font-medium">{String(date).padStart(2, '0')}</span>
                  </CardContent>
                </Card>
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