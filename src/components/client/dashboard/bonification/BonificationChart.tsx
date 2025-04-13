
import React from 'react';
import { BonificationAreaChart } from './BonificationAreaChart';
import { BonificationStatusCards } from './BonificationStatusCards';
import { BonificationTooltip } from './BonificationTooltip';
import { CommissionTiersSection } from './CommissionTiersSection';
import { 
  commissionTiers, 
  chartData, 
  calculateMonthlyCommission 
} from './bonificationConfig';

export function BonificationChart() {
  // In a real app, this data would be fetched from an API
  const { paidBonus, forecastBonus, totalBonus } = {
    paidBonus: 3200,
    forecastBonus: 0,
    totalBonus: 3200,
  };

  // Add state for active tier
  const [activeTier, setActiveTier] = React.useState(0);
  
  // Calculate monthly commission
  const monthlyCommission = calculateMonthlyCommission(activeTier);

  return (
    <div className="px-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Bonificações e Comissões</h2>
        
        <BonificationStatusCards 
          paidBonus={paidBonus}
          forecastBonus={forecastBonus}
          totalBonus={totalBonus}
        />
        
        <div className="relative h-[220px] mt-6">
          <BonificationAreaChart chartData={chartData} />
          <BonificationTooltip 
            commissionTiers={commissionTiers} 
            purchaseValue={119.99} 
          />
        </div>
        
        <CommissionTiersSection 
          commissionTiers={commissionTiers}
          activeTier={activeTier}
          setActiveTier={setActiveTier}
          monthlyCommission={monthlyCommission}
        />
      </div>
    </div>
  );
}
