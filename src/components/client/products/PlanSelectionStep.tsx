
import React, { useState, useEffect } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { motion } from "framer-motion";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";
import { DueDateSelector } from "./DueDateSelector";
import { PlanSelectionHeader } from "./PlanSelectionHeader";
import { Button } from "@/components/ui/button";

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
  onContinue: () => void;
  onBack: () => void;
}

export function PlanSelectionStep({ 
  selectedLines, 
  setSelectedLines,
  selectedDueDate,
  setSelectedDueDate,
  onContinue,
  onBack
}: PlanSelectionStepProps) {
  const { data: calendarStyle } = useCalendarStyles();
  
  const internetOptions = [
    { value: "120GB", label: "Plano 120GB", price: 119.99 },
  ];

  useEffect(() => {
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
  }, [selectedLines, setSelectedLines]);

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

  const isFormValid = selectedLines[0]?.internet && 
                     selectedLines[0]?.ddd && 
                     selectedDueDate !== null;

  return (
    <div className="space-y-4 -mt-[15px] max-w-[340px] mx-auto w-full px-2">
      <PlanSelectionHeader variants={itemVariants} />

      <div className="space-y-3 w-full">
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 gap-2">
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

        <motion.div variants={itemVariants} className="flex justify-between mt-6 gap-2">
          <Button 
            variant="outline"
            className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white w-full"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button 
            className="bg-[#8425af] hover:bg-[#6c1e8f] text-white w-full"
            onClick={onContinue}
            disabled={!isFormValid}
          >
            Continuar
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
