
import React from 'react';
import { formatCurrency } from "@/utils/format";

interface BonificationTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  commissionTiers: Array<{level: number, value: number, label: string}>;
  purchaseValue: number;
}

export function BonificationTooltip({ 
  active, 
  payload, 
  label, 
  commissionTiers, 
  purchaseValue 
}: BonificationTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  const isPurchase = label === 'Compras';

  return (
    <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md" style={{minWidth: "180px"}}>
      <p className="font-medium mb-2">{label}</p>
      <p className="text-emerald-600 font-bold mb-2">
        {formatCurrency(payload[0].value)}
      </p>
      
      <div className="pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-1">Comissões por nível:</p>
        {commissionTiers.map((tier, index) => (
          <div key={tier.level} className="flex justify-between text-xs">
            <span>{tier.label}:</span>
            <span className="font-medium">
              {formatCurrency(isPurchase && data.commissions ? tier.value : tier.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
