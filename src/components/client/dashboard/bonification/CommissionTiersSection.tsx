
import React from 'react';
import { formatCurrency } from "@/utils/format";

interface CommissionTiersSectionProps {
  commissionTiers: Array<{level: number, value: number, label: string}>;
  activeTier: number;
  setActiveTier: (tier: number) => void;
  monthlyCommission: number;
}

export function CommissionTiersSection({ 
  commissionTiers, 
  activeTier, 
  setActiveTier,
  monthlyCommission
}: CommissionTiersSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="text-md font-medium text-gray-800 mb-3">Comissões por Nível</h4>
      <div className="grid grid-cols-4 gap-3">
        {commissionTiers.map((tier) => (
          <div 
            key={tier.level} 
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setActiveTier(tier.level)}
          >
            <p className="text-sm font-medium text-gray-700">{tier.label}</p>
            <p className="text-lg font-bold text-emerald-600">{formatCurrency(tier.value)}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700">
            {activeTier === 0 ? "Comissão mensal total (estimada)" : `Comissão mensal ${commissionTiers.find(t => t.level === activeTier)?.label} (estimada)`}
          </p>
          <p className="text-lg font-bold text-emerald-600">{formatCurrency(monthlyCommission)}</p>
        </div>
      </div>
    </div>
  );
}
