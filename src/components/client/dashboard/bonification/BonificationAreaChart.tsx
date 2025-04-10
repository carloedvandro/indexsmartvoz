
import React from 'react';
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
  ChartContainer
} from "@/components/ui/chart";
import { BonificationTooltip } from './BonificationTooltip';
import { commissionTiers } from './bonificationConfig';

interface BonificationAreaChartProps {
  chartData: any[];
}

export function BonificationAreaChart({ chartData }: BonificationAreaChartProps) {
  return (
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
            <Tooltip content={<BonificationTooltip commissionTiers={commissionTiers} purchaseValue={119.99} />} />
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
  );
}
