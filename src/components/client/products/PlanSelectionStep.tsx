
import React, { useState, useEffect } from "react";
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
  const [isFreePlan, setIsFreePlan] = useState(false);
  
  const internetOptions = [
    { value: "FREE", label: "Plano Gratuito", price: 0 },
    { value: "120GB", label: "Plano 120GB", price: 129.99 },
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
  }, []);

  useEffect(() => {
    if (selectedLines[0]?.internet === "FREE") {
      setIsFreePlan(true);
      
      // Set default values for free plan
      const updatedLines = selectedLines.map(line => 
        line.id === 1 
          ? { ...line, ddd: "00", price: 0 }
          : line
      );
      setSelectedLines(updatedLines);
      
      // Set a default due date
      if (!selectedDueDate) {
        setSelectedDueDate(1);
      }
    } else {
      setIsFreePlan(false);
      
      // Reset default values if they were set by free plan
      if (selectedLines[0]?.ddd === "00") {
        const updatedLines = selectedLines.map(line => 
          line.id === 1 
            ? { ...line, ddd: "" }
            : line
        );
        setSelectedLines(updatedLines);
      }
      
      // Reset default due date if it was set by free plan
      if (selectedDueDate === 1) {
        setSelectedDueDate(null);
      }
    }
  }, [selectedLines[0]?.internet]);

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
              selectedInternet={selectedLines[0]?.internet || ""}
              onInternetChange={handleInternetChange}
              internetOptions={internetOptions}
            />
          </div>
          <div className="w-full">
            <DDDInput
              ddd={selectedLines[0]?.ddd || ""}
              onDDDChange={handleDDDChange}
              disabled={isFreePlan}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          {!isFreePlan ? (
            <DueDateSelector
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              calendarStyle={calendarStyle}
            />
          ) : (
            <div className="text-sm text-purple-700 p-2 bg-purple-50 rounded-md">
              O Plano Gratuito é exclusivo para parceiros, sem necessidade de aquisição de plano pago para realizar suas vendas e receber comissões.
            </div>
          )}
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
