
import React, { useEffect } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { motion } from "framer-motion";
import { useCalendarStyles } from "@/hooks/useCalendarStyles";
import { DueDateSelector } from "./DueDateSelector";
import { PlanSelectionHeader } from "./PlanSelectionHeader";
import { NavigationButtons } from "./NavigationButtons";

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
  onBack: () => void;
  onContinue: () => void;
}

export function PlanSelectionStep({ 
  selectedLines, 
  setSelectedLines,
  selectedDueDate,
  setSelectedDueDate,
  onBack,
  onContinue 
}: PlanSelectionStepProps) {
  const { data: calendarStyle } = useCalendarStyles();
  
  // Updated plan options with the correct values and prices
  const internetOptions = [
    { value: "110GB", label: "Smartvoz 110GB", price: 109.99 },
    { value: "120GB", label: "Smartvoz 120GB", price: 119.99 },
    { value: "140GB", label: "Smartvoz 140GB", price: 139.99 },
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

  const isContinueDisabled = !selectedLines[0]?.internet || !selectedLines[0]?.ddd || !selectedDueDate;

  return (
    <div className="max-w-[379px] mx-auto w-full" style={{ marginTop: "74px" }}>
      <div className="space-y-6">
        <div className="space-y-3 text-center">
          <div className="w-full flex justify-center mb-4">
            <img 
              src="/lovable-uploads/8681ef58-fb81-4463-8d12-8ede81fcab0a.png" 
              alt="Smartvoz Logo" 
              className="w-auto h-[90px] object-contain"
            />
          </div>
          <h2 className="text-xl font-medium text-black">Personalize seu pedido</h2>
        </div>

        <div className="space-y-4 w-full">
          <motion.div 
            className="w-full max-w-[340px] mx-auto"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InternetSelector
                  selectedInternet={selectedLines[0]?.internet || undefined}
                  onInternetChange={handleInternetChange}
                  internetOptions={internetOptions}
                  showPrice={true}
                />
              </div>
              <div>
                <DDDInput
                  ddd={selectedLines[0]?.ddd || ""}
                  onDDDChange={handleDDDChange}
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full max-w-[340px] mx-auto"
            variants={itemVariants}
          >
            <DueDateSelector
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              calendarStyle={calendarStyle}
            />
          </motion.div>

          <motion.div 
            className="w-full max-w-[340px] mx-auto"
            variants={itemVariants}
          >
            <PriceSummary
              linePrice={selectedLines[0]?.price || 0}
              totalPrice={totalPrice}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <NavigationButtons 
        currentStep={1}
        handleBack={onBack}
        handleContinue={onContinue}
        disabled={isContinueDisabled}
      />
    </div>
  );
}
