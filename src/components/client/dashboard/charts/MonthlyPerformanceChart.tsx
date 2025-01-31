import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
      <ChartHeader title="Faturamento mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#ad1cb0" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#ad1cb0" />
              </linearGradient>
              <linearGradient id="commissionsGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="projectionGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#0FA0CE" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0FA0CE" />
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
              tickFormatter={(value) => `${value}`}
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
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px",
                fontWeight: 'bold'
              }}
            />
            <Bar
              dataKey="value"
              name="Vendas"
              fill="url(#salesGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              className="animate-rainbow"
            />
            <Bar
              dataKey="trend"
              name="Comissões"
              fill="url(#commissionsGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              className="animate-rainbow"
            />
            <Bar
              dataKey="projected"
              name="Projeção"
              fill="url(#projectionGradient)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              className="animate-rainbow"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
