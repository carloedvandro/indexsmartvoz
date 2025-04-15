
import React, { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { motion } from "framer-motion";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";
import { DueDateSelector } from "./DueDateSelector";
import { PlanSelectionHeader } from "./PlanSelectionHeader";

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
    { value: "FREE", label: "Plano Gratuito", price: 0 },
    { value: "120GB", label: "Plano 120GB", price: 129.99 },
  ];

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
    <div className="space-y-6 -mt-[15px]">
      <PlanSelectionHeader variants={itemVariants} />

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
          <div className="w-full">
            <DDDInput
              ddd={selectedLines[0]?.ddd || ""}
              onDDDChange={handleDDDChange}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DueDateSelector
            selectedDueDate={selectedDueDate}
            setSelectedDueDate={setSelectedDueDate}
            calendarStyle={calendarStyle}
          />
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
