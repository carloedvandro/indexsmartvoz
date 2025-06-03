
import React from 'react';
import { FinancialCard } from './FinancialCard';
import { financialCardsData } from './FinancialCardsData';

export function FinancialCardsContainer() {
  return (
    <div className="container mb-8">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-3">
        {financialCardsData.map((card, index) => (
          <div key={index} className="w-full max-w-[420px] mx-auto">
            <FinancialCard {...card} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
