
import React from 'react';
import { formatCurrency } from "@/utils/format";

interface BonificationStatusCardsProps {
  paidBonus: number;
  forecastBonus: number;
  totalBonus: number;
}

export function BonificationStatusCards({ 
  paidBonus, 
  forecastBonus, 
  totalBonus 
}: BonificationStatusCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">{formatCurrency(paidBonus)}</p>
        <p className="bg-gray-200 text-gray-600 text-xs font-medium uppercase w-full text-center py-1.5 mt-2 rounded">PAGO</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">{formatCurrency(forecastBonus)}</p>
        <p className="bg-gray-200 text-gray-600 text-xs font-medium uppercase w-full text-center py-1.5 mt-2 rounded">PREVISÃO</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
        <p className="text-lg font-bold text-gray-900">{formatCurrency(totalBonus)}</p>
        <p className="bg-gray-200 text-gray-600 text-xs font-medium uppercase w-full text-center py-1.5 mt-2 rounded">TOTAL</p>
      </div>
    </div>
  );
}
