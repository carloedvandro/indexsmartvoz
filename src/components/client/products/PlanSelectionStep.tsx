import { useState } from "react";
import { InternetSelector } from "./InternetSelector";
import { DDDInput } from "./DDDInput";
import { PriceSummary } from "./PriceSummary";
import { Card, CardContent } from "@/components/ui/card";

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
    { value: "110GB", label: "110GB", price: 124.99 },
    { value: "120GB", label: "120GB", price: 134.99 },
    { value: "140GB", label: "140GB", price: 144.99 },
  ];

  const dueDates = [1, 5, 7, 10, 15, 20];

  useState(() => {
    if (selectedLines.length === 0) {
      setSelectedLines([
        {
          id: 1,
          internet: "110GB",
          type: "Nova Linha",
          ddd: "",
          price: 124.99,
        },
      ]);
    }
  });

  const handleInternetChange = (value: string) => {
    const newPrice = internetOptions.find(option => option.value === value)?.price || 124.99;
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

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-10 min-h-[400px] pt-2">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Personalize seu pedido</h2>
        <p className="text-gray-600">
          Confira aqui as melhores ofertas para você, cliente Smatvoz.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-6 pt-4 w-full">
          <InternetSelector
            selectedInternet={selectedLines[0]?.internet || "110GB"}
            onInternetChange={handleInternetChange}
            internetOptions={internetOptions}
          />
          <DDDInput
            ddd={selectedLines[0]?.ddd || ""}
            onDDDChange={handleDDDChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="mb-5">
            <h2 className="text-sm font-medium whitespace-nowrap">
              Escolha a melhor data de vencimento da sua fatura:
            </h2>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-3 gap-3">
              {dueDates.map((date) => (
                <Card 
                  key={date}
                  className={`cursor-pointer transition-colors h-12 flex items-center justify-center bg-white border-gray-200 ${
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
        </div>

        <PriceSummary
          linePrice={selectedLines[0]?.price || 0}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}