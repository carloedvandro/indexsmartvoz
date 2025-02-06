
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PriceSummary } from "./PriceSummary";
import { CalendarStyleSelector, type CalendarStyle } from "./calendar/CalendarStyleSelector";
import { DueDateCalendar } from "./calendar/DueDateCalendar";
import { PlanSelectionForm } from "./plan/PlanSelectionForm";

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
    { value: "Plano Gratuito", label: "Plano Gratuito", price: 0 },
    { value: "110GB", label: "110GB", price: 109.99 },
    { value: "120GB", label: "120GB", price: 119.99 },
    { value: "130GB", label: "130GB", price: 129.99 },
    { value: "140GB", label: "140GB", price: 139.99 },
    { value: "150GB", label: "150GB", price: 149.99 },
  ];

  const ddds = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "21", "22", "24", "27", "28",
    "31", "32", "33", "34", "35", "37", "38",
    "41", "42", "43", "44", "45", "46",
    "47", "48", "49", "51", "53", "54", "55",
    "61", "62", "64", "63", "65", "66",
    "67", "68", "69",
    "71", "73", "74", "75", "77",
    "79", "81", "87", "82", "83", "84",
    "85", "88", "86", "89",
    "91", "93", "94", "92", "97",
    "95", "96", "98", "99",
  ];

  const dueDates = [2, 5, 7, 9, 12, 15, 17, 19, 21, 25, 27, 30];
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedStyle, setSelectedStyle] = useState<CalendarStyle | null>(null);

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

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      const day = date.getDate();
      if (dueDates.includes(day)) {
        setSelectedDueDate(day);
      }
    }
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

      <div className="space-y-4 max-w-2xl mx-auto">
        <motion.div variants={itemVariants}>
          <PlanSelectionForm
            selectedLines={selectedLines}
            onInternetChange={handleInternetChange}
            onDDDChange={handleDDDChange}
            internetOptions={internetOptions}
            ddds={ddds}
            isFreePlan={isFreePlan}
          />
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

          <div className="w-full mb-4">
            <CalendarStyleSelector
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <DueDateCalendar
              date={date}
              onDateSelect={handleDateSelect}
              dueDates={dueDates}
              selectedStyle={selectedStyle}
            />
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
