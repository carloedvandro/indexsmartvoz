import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";
import { monthlyData } from "./data/chartData";

export const MonthlyPerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Performance Mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="vendasGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FF6B00" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="comissoesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="projecaoGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#1f2937" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              style={{
                fontWeight: 'bold'
              }}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
              style={{
                fontWeight: 'bold'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontWeight: 'bold'
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `${label}`}
              cursor={{ stroke: '#FF6B00', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="vendas"
              name="Vendas"
              stroke="#FF6B00"
              fill="url(#vendasGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="comissoes"
              name="Comissões"
              stroke="#0EA5E9"
              fill="url(#comissoesGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="projecao"
              name="Projeção"
              stroke="#2563EB"
              fill="url(#projecaoGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};