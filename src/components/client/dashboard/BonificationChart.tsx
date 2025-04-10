
import React from 'react';
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
  ReferenceLine 
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

const data = [
  { name: 'Adesão', total: 4.5 },
  { name: 'Compras', total: 6.8 },
];

export function BonificationChart() {
  // Fictional values for the cards
  const paidBonus = 1250.75;
  const forecastBonus = 3780.42;
  const totalBonus = 5031.17;
  
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
              data={data}
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
              <Tooltip content={<CustomTooltip />} />
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
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
      <p className="font-medium">{label}</p>
      <p className="text-emerald-600">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}
