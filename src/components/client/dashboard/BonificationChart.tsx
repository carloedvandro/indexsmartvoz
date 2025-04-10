import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { useChartData } from "@/hooks/useChartData";

// Commission tiers data
const commissionTiers = [
  { level: 1, value: 20.00, label: "1° Nível" },
  { level: 2, value: 5.00, label: "2° Nível" },
  { level: 3, value: 5.00, label: "3° Nível" },
  { level: 4, value: 5.00, label: "4° Nível" },
];

// Updated data for the area chart with the new purchase value
const chartData = [
  { name: 'Adesão', total: 4.5, commissions: commissionTiers.map(tier => tier.value) },
  { name: 'Compras', total: 119.99, commissions: commissionTiers.map(tier => tier.value * 1.3) },
];

export function BonificationChart() {
  // Fictional values for the cards
  const paidBonus = 1250.75;
  const forecastBonus = 3780.42;
  const totalBonus = 5031.17;
  
  // State to track active commission tier for display
  const [activeTier, setActiveTier] = useState(0); // 0 = all tiers

  // Calculate monthly commissions based on the data
  const calculateMonthlyCommission = (tier: number) => {
    // Assume we have 10 adhesions per month
    const adhesionsPerMonth = 10;
    // New purchase value of R$119.99
    const purchaseValue = 119.99;
    
    if (tier === 0) {
      // Total of all tiers
      return commissionTiers.reduce((acc, t) => acc + (t.value * adhesionsPerMonth), 0);
    }
    
    // Individual tier calculation
    const tierData = commissionTiers.find(t => t.level === tier);
    return tierData ? tierData.value * adhesionsPerMonth : 0;
  };

  // Monthly commissions display value
  const monthlyCommission = calculateMonthlyCommission(activeTier);
  
  return (
    <Card className="p-5 my-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Bonificações <span className="text-sm text-gray-500 font-medium">04/25</span></h3>
      </div>
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
      
      {/* Commission tiers display */}
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
      
      <div className="h-[300px] w-full">
        <ChartContainer 
          className="h-full" 
          config={{
            total: {
              theme: {
                light: "#10b981",
                dark: "#10b981", // Added the dark theme color
              },
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 30,
              }}
            >
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(tick) => {
                  if (tick === 0) return '0';
                  if (tick < 0) return `-${Math.abs(tick)}e-1`;
                  return `${tick}e-1`;
                }}
                domain={[-8, 8]}
                ticks={[-8, -6, -4, -2, 0, 2, 4, 6, 8]}
              />
              <ReferenceLine y={0} stroke="#ccc" />
              <Tooltip content={<CustomTooltip commissionTiers={commissionTiers} purchaseValue={119.99} />} />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#10b981" 
                fill="url(#totalGradient)"
                name="Total"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  commissionTiers: Array<{level: number, value: number, label: string}>;
  purchaseValue: number;
}

function CustomTooltip({ active, payload, label, commissionTiers, purchaseValue }: CustomTooltipProps) {
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
