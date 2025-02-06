
import { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { PriceSummary } from "./PriceSummary";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    "11", "12", "13", "14", "15", "16", "17", "18", "19", // São Paulo
    "21", "22", "24", // Rio de Janeiro
    "27", "28", // Espírito Santo
    "31", "32", "33", "34", "35", "37", "38", // Minas Gerais
    "41", "42", "43", "44", "45", "46", // Paraná
    "47", "48", "49", // Santa Catarina
    "51", "53", "54", "55", // Rio Grande do Sul
    "61", // Distrito Federal
    "62", "64", // Goiás
    "63", // Tocantins
    "65", "66", // Mato Grosso
    "67", // Mato Grosso do Sul
    "68", // Acre
    "69", // Rondônia
    "71", "73", "74", "75", "77", // Bahia
    "79", // Sergipe
    "81", "87", // Pernambuco
    "82", // Alagoas
    "83", // Paraíba
    "84", // Rio Grande do Norte
    "85", "88", // Ceará
    "86", "89", // Piauí
    "91", "93", "94", // Pará
    "92", "97", // Amazonas
    "95", // Roraima
    "96", // Amapá
    "98", "99", // Maranhão
  ];

  const dueDates = [2, 5, 7, 9, 12, 15, 17, 19, 21, 25, 27, 30];
  const [date, setDate] = useState<Date | undefined>(undefined);

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
              <span className="text-sm font-medium mb-1 block">DDD</span>
              <Select value={selectedLines[0]?.ddd || ""} onValueChange={handleDDDChange}>
                <SelectTrigger className="bg-white h-[42px]">
                  <SelectValue placeholder="DDD" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-white max-h-[178px] overflow-y-auto w-full">
                  {ddds.map((dddOption) => (
                    <SelectItem 
                      key={dddOption} 
                      value={dddOption}
                      className="hover:bg-[#8425af] hover:text-white focus:bg-[#8425af] focus:text-white"
                    >
                      {dddOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <div className="grid grid-cols-2 gap-4 w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              locale={ptBR}
              modifiers={{
                available: (date) => dueDates.includes(date.getDate())
              }}
              modifiersClassNames={{
                available: "bg-[#9b87f5] text-white hover:bg-[#7E69AB] hover:text-white shadow-md"
              }}
              className="rounded-md border bg-white col-span-2 [&_.rdp-cell]:justify-center [&_.rdp-cell]:flex [&_.rdp-table]:w-full [&_.rdp-head_div]:justify-center [&_.rdp-head_div]:w-full [&_.rdp-caption]:justify-center [&_.rdp]:justify-center [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-day]:w-12 [&_.rdp-day]:h-12 [&_.rdp-day]:rounded-md [&_.rdp-day]:flex [&_.rdp-day]:items-center [&_.rdp-day]:justify-center [&_.rdp-cell]:p-0 [&_.rdp-tbody]:justify-center [&_.rdp-tbody]:grid [&_.rdp-tbody]:grid-cols-7 [&_.rdp-tbody]:gap-1 [&_.rdp-table]:grid [&_.rdp-table]:grid-cols-7 [&_.rdp-table]:gap-1 [&_.rdp-day_span]:text-lg [&_.rdp-day_span]:font-medium scrollbar-hide"
              disabled={(date) => !dueDates.includes(date.getDate())}
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
