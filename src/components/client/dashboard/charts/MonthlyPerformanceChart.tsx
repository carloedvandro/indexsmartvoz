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
    <div className="mt-24 w-full px-4">
      <ChartHeader title="Performance Mensal" />
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={monthlyData}
          margin={{
            top: 30,
            right: 30,
            left: 45,
            bottom: 45,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#1f2937" 
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            dy={46}
          />
          <YAxis
            stroke="#1f2937"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tickFormatter={(value) => `${value}`}
            dx={-25}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: "20px",
              marginTop: "35px"
            }}
          />
          <Bar
            dataKey="value"
            name="Vendas"
            fill="#F97316"
            radius={[4, 4, 0, 0]}
            barSize={12}
          />
          <Bar
            dataKey="trend"
            name="Comissões"
            fill="#0EA5E9"
            radius={[4, 4, 0, 0]}
            barSize={12}
          />
          <Bar
            dataKey="projected"
            name="Projeção"
            fill="#2563EB"
            radius={[4, 4, 0, 0]}
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};