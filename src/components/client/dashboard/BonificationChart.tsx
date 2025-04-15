
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { BonificationStatusCards } from './bonification/BonificationStatusCards';
import { CommissionTiersSection } from './bonification/CommissionTiersSection';
import { BonificationAreaChart } from './bonification/BonificationAreaChart';
import { 
  commissionTiers, 
  chartData, 
  calculateMonthlyCommission 
} from './bonification/bonificationConfig';

export function BonificationChart() {
  // Fictional values for the cards
  const paidBonus = 1250.75;
  const forecastBonus = 3780.42;
  const totalBonus = 5031.17;
  
  // State to track active commission tier for display
  const [activeTier, setActiveTier] = useState(0); // 0 = all tiers

  // Monthly commissions display value
  const monthlyCommission = calculateMonthlyCommission(activeTier);
  
  return (
    <Card className="p-5 my-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Bonificações <span className="text-sm text-gray-500 font-medium">04/25</span></h3>
      </div>
      
      <BonificationStatusCards 
        paidBonus={paidBonus} 
        forecastBonus={forecastBonus} 
        totalBonus={totalBonus} 
      />
      
      <CommissionTiersSection 
        commissionTiers={commissionTiers}
        activeTier={activeTier}
        setActiveTier={setActiveTier}
        monthlyCommission={monthlyCommission}
      />
      
      <BonificationAreaChart chartData={chartData} />
    </Card>
  );
}
