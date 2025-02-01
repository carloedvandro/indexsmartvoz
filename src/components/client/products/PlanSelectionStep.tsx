import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  const handleAddLine = () => {
    if (selectedLines.length < 5) {
      setSelectedLines([
        ...selectedLines,
        {
          id: selectedLines.length + 1,
          internet: "110GB",
          type: "Nova Linha",
          ddd: "",
          price: 124.99,
        },
      ]);
    }
  };

  const handleInternetChange = (value: string, lineId: number) => {
    const newPrice = internetOptions.find(option => option.value === value)?.price || 124.99;
    setSelectedLines(selectedLines.map(line => 
      line.id === lineId 
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

      {selectedLines.length === 0 && (
        <Button
          onClick={handleAddLine}
          className="w-full bg-[#8425af] hover:bg-[#6c1e8f] text-white"
        >
          Adicionar nova linha
        </Button>
      )}

      <div className="space-y-4">
        {selectedLines.map((line) => (
          <div key={line.id} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">{String(line.id).padStart(2, '0')}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Internet</label>
                <Select 
                  value={line.internet}
                  onValueChange={(value) => handleInternetChange(value, line.id)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
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

              <div className="space-y-2">
                <label className="text-sm text-gray-600">DDD</label>
                <Input placeholder="DDD" maxLength={2} className="bg-white" />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Valor da linha:</span>
              <span className="font-medium">R$ {line.price.toFixed(2)}/mês</span>
            </div>
          </div>
        ))}

        {selectedLines.length > 0 && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center font-medium">
              <span>Total mensal:</span>
              <span>R$ {totalPrice.toFixed(2)}/mês</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}