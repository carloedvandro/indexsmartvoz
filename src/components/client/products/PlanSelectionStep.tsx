import { useState } from "react";
import { Input } from "@/components/ui/input";
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
}

export function PlanSelectionStep({ selectedLines, setSelectedLines }: PlanSelectionStepProps) {
  const internetOptions = [
    { value: "110GB", label: "110GB", price: 124.99 },
    { value: "120GB", label: "120GB", price: 134.99 },
    { value: "140GB", label: "140GB", price: 144.99 },
  ];

  // Initialize with one line if there are no lines
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

  const totalPrice = selectedLines.reduce((acc, line) => acc + line.price, 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Personalize seu pedido</h2>
        <p className="text-gray-600">
          Confira aqui as melhores ofertas para você, cliente Smatvoz.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select 
              value={selectedLines[0]?.internet || "110GB"}
              onValueChange={handleInternetChange}
            >
              <SelectTrigger className="bg-white h-[52px]">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-600">Internet</span>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {internetOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="hover:bg-[#8425af] hover:text-white focus:bg-[#8425af] focus:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">DDD</span>
              <Input 
                placeholder="DDD" 
                maxLength={2} 
                className="bg-white h-[52px]" 
                value={selectedLines[0]?.ddd || ""}
                onChange={(e) => {
                  setSelectedLines(selectedLines.map(line => 
                    line.id === 1 
                      ? { ...line, ddd: e.target.value }
                      : line
                  ));
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Valor da linha:</span>
          <span className="font-medium">R$ {selectedLines[0]?.price.toFixed(2)}/mês</span>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center font-medium">
            <span>Total mensal:</span>
            <span>R$ {totalPrice.toFixed(2)}/mês</span>
          </div>
        </div>
      </div>
    </div>
  );
}