import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, Tooltip } from 'recharts';
import { formatCurrency } from "@/utils/format";

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
    projected: number;
  }>;
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="max-w-[2000px] mx-auto w-full">
      <h3 className="text-lg font-semibold mb-4">Faturamento</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#7B61FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
            />
            <Tooltip
              formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Faturamento']}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7B61FF"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={{ fill: "#7B61FF", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#7B61FF" }}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#FFA500"
              strokeWidth={2}
              dot={{ fill: "#FFA500", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#FFA500" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};