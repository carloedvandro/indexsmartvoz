
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
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6a236bed-4542-4d66-a0b3-5bacb93aa949.png" 
              alt="Ícone de cifrão dourado" 
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">R$ 5.000,01</p>
            <p className="text-xs text-gray-500">Saldo disponível</p>
          </div>
        </div>
      </Card>

      <Card 
        className="relative p-4 border rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
        onClick={() => onCardClick('bonus')}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6a236bed-4542-4d66-a0b3-5bacb93aa949.png" 
              alt="Ícone de cifrão dourado" 
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">R$ 42.576,22</p>
            <p className="text-xs text-gray-500">Ganhos até hoje</p>
          </div>
        </div>
        
        <div className="h-[1px] bg-gray-200 w-full mb-3"></div>
        
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/6a236bed-4542-4d66-a0b3-5bacb93aa949.png" 
              alt="Ícone de cifrão dourado" 
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">R$ 0,00</p>
            <p className="text-xs text-gray-500">Saldo bloqueado</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
