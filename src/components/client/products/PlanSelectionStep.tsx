
import React, { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { motion } from "framer-motion";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";
import { DueDateSelector } from "./DueDateSelector";
import { PlanSelectionHeader } from "./PlanSelectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  const internetOptions = [
    { value: "120GB", label: "Plano 120GB", price: 119.99 },
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
    <div className="space-y-6 -mt-[0px] pt-5 mx-auto w-full" style={{ maxWidth: isMobile ? "100%" : "520px" }}>
      <motion.div 
        className="space-y-3 mx-auto text-center"
        variants={itemVariants}
      >
        <div className="w-full flex justify-center mb-4">
          <img 
            src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
            alt="Smartvoz Logo" 
            className="h-[140px] object-contain mix-blend-multiply opacity-90 contrast-125"
          />
        </div>
        <h2 className="text-xl font-medium text-[#8425af]">Personalize seu pedido</h2>
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
