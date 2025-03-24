
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

interface BalanceCardsProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  onCardClick: (cardType: string) => void;
}

export function BalanceCards({ selectedMonth, selectedYear, months, onCardClick }: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card 
        className="relative p-4 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
        style={{
          backgroundColor: 'white',
          position: 'relative',
          zIndex: 50
        }}
        onClick={() => onCardClick('available')}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#580180]" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/9c458018-4e54-4993-92c1-bf40c3e95228.png"
              alt="Dollar sign"
              className="h-10 w-10 mr-2 animate-spin-reverse-slow"
            />
            <span className="text-[#580180] font-medium">Saldo disponível</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#580180]">R$</span>
            <span className="text-[#580180] text-xl">5.000,01</span>
          </div>
        </div>
      </Card>

      <Card 
        className="relative p-4 border rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
        onClick={() => onCardClick('bonus')}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#580180]" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start max-md:flex-col max-md:items-stretch">
              <div className="flex items-center">
                <img
                  src="/lovable-uploads/9c458018-4e54-4993-92c1-bf40c3e95228.png"
                  alt="Dollar sign"
                  className="h-10 w-10 mr-2 animate-spin-reverse-slow"
                />
                <div className="text-gray-900 font-medium text-[15px] whitespace-nowrap">
                  Total de bônus recebido em {months.find(m => m.value === selectedMonth)?.label}/{selectedYear}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 md:mt-0 justify-end">
                <span className="text-gray-500">R$</span>
                <span className="text-gray-500 text-xl">42.576,22</span>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-200 w-full"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-gray-900 font-medium">Total de saldo</span>
              <span className="text-red-500 font-medium mt-1">bloqueado</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-500">R$</span>
              <span className="text-gray-500 text-xl">0,00</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
