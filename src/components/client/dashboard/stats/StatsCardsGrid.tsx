
import React from 'react';
import { ActivationsCard } from './ActivationsCard';
import { IncomeCard } from './IncomeCard';
import { RechargesCard } from './RechargesCard';
import { LineStatusCard } from './LineStatusCard';

export function StatsCardsGrid() {
  return (
    <div className="container mb-8">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="w-full max-w-[420px] mx-auto">
          <ActivationsCard />
        </div>
        <div className="w-full max-w-[420px] mx-auto">
          <IncomeCard />
        </div>
        <div className="w-full max-w-[420px] mx-auto">
          <RechargesCard />
        </div>
        <div className="w-full max-w-[420px] mx-auto">
          <LineStatusCard />
        </div>
      </div>
    </div>
  );
}
