
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";
import { AreaChart, CreditCard, DollarSign } from "lucide-react";

interface BalanceCardsProps {
  selectedMonth: string;
  selectedYear: string;
  months: Array<{ value: string; label: string }>;
  onCardClick: (cardType: string) => void;
}

export function BalanceCards({ selectedMonth, selectedYear, months, onCardClick }: BalanceCardsProps) {
  // These would typically come from an API call in a real app
  const availableBalance = 5000.01;
  const totalEarnings = 42576.22;
  const blockedBalance = 0;

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
          <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-md">
            <CreditCard className="h-6 w-6 text-gray-600" />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">{formatCurrency(availableBalance)}</p>
            <p className="text-xs text-gray-500">Saldo disponível</p>
          </div>
        </div>
      </Card>

      <Card 
        className="relative p-4 border rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
        onClick={() => onCardClick('bonus')}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-md">
            <AreaChart className="h-6 w-6 text-gray-600" />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">{formatCurrency(totalEarnings)}</p>
            <p className="text-xs text-gray-500">Ganhos até hoje</p>
          </div>
        </div>
        
        <div className="h-[1px] bg-gray-200 w-full mb-3"></div>
        
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-md">
            <DollarSign className="h-6 w-6 text-gray-600" />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-black">{formatCurrency(blockedBalance)}</p>
            <p className="text-xs text-gray-500">Saldo bloqueado</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
